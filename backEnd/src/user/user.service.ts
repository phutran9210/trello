import { Injectable,Inject,HttpException,HttpStatus, UnauthorizedException, BadRequestException, Res,Req} from '@nestjs/common';
import { Response,Request  } from 'express'
import { CreateUserDto,ReqUser,ReConfirmUser } from './dto/create-user.dto';
import {tokenUser} from "./interface/res.interface"
import {Role,User,Friendship} from "../user/entities/user.entity"
import { Repository,Brackets} from 'typeorm';
import * as bcrypt from "bcrypt"
import { customAlphabet  } from 'nanoid';
import {SearchDto} from "./dto/search.dto"
import {UserResponse,UserProfile} from "../user/dto/create-user.dto"
import * as moment from 'moment'
import { JwtService } from '@nestjs/jwt';
import * as stringSimilarity from 'string-similarity';
import { MailerService } from './mailer/mailer.service';
import { serialize } from 'cookie';
import { jwtConstants } from './constain';
import { verify, decode,TokenExpiredError } from 'jsonwebtoken';


class UserWithSimilarity extends User {
  similarity?: number;
}


const nanoid = customAlphabet('1234567890abcdef', 10)
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPTS_EXPIRY = 60 * 15;

const saltOrRounds = 10;

@Injectable()
export class UserService {
     constructor(
      private jwtService: JwtService,
      // @Inject('REDIS_CLIENT') private readonly redis: Redis,
      private mailService : MailerService,
    @Inject("USER_REPOSITORY")
    private userRepository : Repository<User>,
    @Inject("ROLE_REPOSITORY")
    private roleRepository : Repository<Role>,
    @Inject("FRIEND_REPOSITORY")
    private friendshipRepository : Repository<Friendship>
    ){}
  async create(createUserDto: CreateUserDto): Promise< ReqUser> {
            const {username, email, password} = createUserDto
            const existingUsername = await this.userRepository.createQueryBuilder("user")
            .where("user.username = :username", {username})
            .getOne()
            
            if (existingUsername) {
              throw new HttpException("Người dùng đã tồn tại",HttpStatus.BAD_REQUEST)
            }
            
            const existEmail = await this.userRepository.createQueryBuilder("user")
            .where("user.email = :email",{email})
            .getOne()
           
            
            if (existEmail) {
              throw new HttpException("Email đã được sử dụng",HttpStatus.BAD_REQUEST)
            }
      
            const hash = await bcrypt.hash(password, saltOrRounds)
            
            
              const defaultRole = await this.roleRepository.findOne({ where:{role_name: 'user'}  });
              if (!defaultRole) {
                  throw new Error('Default role "user" not found');
                }
               const user_id = nanoid(10)
              const verificationCode = nanoid(5);
              
               const verificationExpires = moment().add(1, 'h').toDate()
                
                const newUser = this.userRepository.create({
                  ...createUserDto,
                  user_id : user_id,
                  roles: [defaultRole],
                  user_password  : hash,
                  verification_code : verificationCode,
                  verification_expires :verificationExpires,

                });
               this.mailService.sendConfirmationEmail(email,user_id, verificationCode )
                
              await this.userRepository.save(newUser)
        
                
              return {  user_id : user_id, messenger: "success", code: HttpStatus.OK };
      
  }

  async validateCode(user_id: string, code: string): Promise<boolean> {
    
    try {
      const user = await this.userRepository.findOne({ where: { user_id } } );
      console.log(user);
  
      const now = new Date();
      const expires = new Date(user.verification_expires);
    
 
      if (user.verification_code !== code || expires < now) {

        return false;
      } else{
        user.active_status = 'active';
        user.active_time = new Date();
      //   const highestRole = [...user.roles].sort((a, b) => b.priority - a.priority)[0];
      // const userCopy = { ...user, role: highestRole.role_name };

      // const payloadCookie = { sub: userCopy.user_id, username: userCopy.username, role: userCopy.role };
      // const access_token = await this.jwtService.signAsync(payloadCookie);
      // const refresh_token = await this.jwtService.signAsync(payloadCookie, { expiresIn: '7d' });
      // user.refresh_token = refresh_token
      // await this.userRepository.save(user);
  
  
      // const accessCookie = serialize('access_jwt', access_token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
      //   sameSite: 'strict',
      //   maxAge: 3600*360,  
      //   path: '/',
      // });
      
      // res.setHeader('Set-Cookie', accessCookie);
        await this.userRepository.save(user);
      return true;

      }
    } catch (error) {
     
      console.error(error);
      throw new Error('An error occurred while validating the code.');
    }
  }

  async renewPasswordService ( data : any) : Promise<any>{

    const result = await this.userRepository.findOne({where : { email : data.email}})

    if(!result){
      throw new HttpException("Email Not Found",HttpStatus.NOT_FOUND)
    }
    const resetPasswordToken = await this.jwtService.signAsync({ id: result.user_id },{ expiresIn: '1h' });
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);
    result.reset_password_token = resetPasswordToken,
    result.expires_in = expiresIn
    await this.userRepository.save(result)

    const subject = "Password Reset Request"
     const text = `
     Hello,

     We received a request to reset the password for your account.
     
     Click on the following link to set a new password:
     http://localhost:5173/link-reset-password?token=${resetPasswordToken}
     
     If you did not request a password reset, please ignore this email or contact our support team if you have concerns.
     
     Thank you,
  
     `
    this.mailService.sendEmail({
      to: data.email,
      subject: subject,
      text: text
    })

    return new HttpException("Send mail success",HttpStatus.OK)
  }


  async renewPassword( data : any,@Res({ passthrough: true }) res: Response) : Promise<any>{
    const password = data.password
    const token = data.token

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.userRepository.findOne({where :{user_id : payload.id }})
    
      if (!user) {
        throw new HttpException("User not found",HttpStatus.NOT_FOUND)
      }
      if (!user.reset_password_token || user.reset_password_token !== token) {
        throw new HttpException("Invalid or expired token", HttpStatus.FORBIDDEN);
    }
      const hash = await bcrypt.hash(password, saltOrRounds)
      user.user_password = hash
      user.reset_password_token = null;
      await this.userRepository.save(user);
 
      return new HttpException("Change password success",HttpStatus.OK)

    } catch (error) {

      if (error instanceof TokenExpiredError) {
        throw new HttpException("JWT expired", HttpStatus.NOT_ACCEPTABLE);
    } else {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }

    }
    
  }

  async userLogin(userData: { password: string, username: string },@Res({ passthrough: true }) res: Response): Promise<UserResponse> {
    const { password, username } = userData;
    console.log(userData);
    

    const user = await this.userRepository.findOne({ where: { username }, relations: ['roles'] });
    console.log(user);
    
    if (!user) {
        throw new UnauthorizedException();
    }
    
    if (user.active_status !== "active") {
        throw new BadRequestException('User is not active');
    }
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
        throw new BadRequestException('Invalid username or password.');
    }

    const highestRole = [...user.roles].sort((a, b) => b.priority - a.priority)[0];
    const userCopy = { ...user, role: highestRole.role_name };
    delete userCopy.roles;

    const payload = { sub: userCopy.user_id, username: userCopy.username, role: userCopy.role };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    user.refresh_token = refresh_token
    await this.userRepository.save(user);


    const accessCookie = serialize('access_jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600*360,  
      path: '/',
    });
    
    res.setHeader('Set-Cookie', accessCookie);
    const userPayload = {
        user_id: userCopy.user_id,
        username: userCopy.username,
        role: userCopy.role,
    };

    return new UserResponse(HttpStatus.OK, "Login successful.", userPayload);
}

async userLogout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
 console.log("req",req.user);
 
  if (!req.user) {
    return HttpStatus.NOT_ACCEPTABLE
  }
  const user_id = (req.user as tokenUser).sub
  const user = await this.userRepository.findOne({ where: { user_id } });

  if (!user) {
    throw new BadRequestException('User not found.');
  }
  
  user.refresh_token = null;
  await this.userRepository.save(user);

  const accessCookie = serialize('access_jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', accessCookie);
  
  return HttpStatus.OK
}

async createCode (userData: { password: string, username: string }) : Promise<ReConfirmUser>{
  const { password, username } = userData;

  const user = await this.userRepository.findOne({ where: { username }, relations: ['roles'] });
  if (!user) {
      throw new UnauthorizedException();
  }
  const isMatch = await bcrypt.compare(password, user.user_password);
  if (!isMatch) {
      throw new BadRequestException('Invalid username or password.');
  }

      const verificationCode = nanoid(5);
      
       const verificationExpires = moment().add(1, 'h').toDate()
       user.verification_code = verificationCode;
       user.verification_expires = verificationExpires;
       await this.userRepository.save(user);
  
  return {  messenger: "success", status: HttpStatus.OK, confirmCode : verificationCode, user_id : user.user_id };
  
}

async getOneUser(@Req() req: Request,userId: string): Promise<any> {
  if (!req.user) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
      select : ["username","email"]
    });
    console.log(user);
    
    return user;
  } else {
    const reqUserId = (req.user as tokenUser).sub
    const friendships = await this.friendshipRepository
    .createQueryBuilder("friendship")
    .where("friendship.status_id = 3")
    .andWhere(
      new Brackets(qb => {
        qb.where("friendship.requester_id = :reqUserId AND friendship.requested_id = :userId", { reqUserId, userId })
          .orWhere("friendship.requested_id = :reqUserId AND friendship.requester_id = :userId", { reqUserId, userId });
      })
    )
    .getMany();
 
    
    if (friendships.length > 0) {
      return HttpStatus.NOT_MODIFIED;   
    }

    const requestedFriends = await this.friendshipRepository
    .createQueryBuilder("friendship")
    .leftJoinAndSelect("friendship.requested", "requested")
    .leftJoinAndSelect("friendship.requester", "requester")
    .where("friendship.status_id = 2")
    .andWhere(
        new Brackets(qb => {
            qb.where("friendship.requester_id = :userId", { userId })
              .orWhere("friendship.requested_id = :userId", { userId });
        })
    )
    .andWhere(
        new Brackets(qb => {
            qb.where("requested.user_id != :userId", { userId })
              .orWhere("requester.user_id != :userId", { userId });
        })
    )
    .select([
        "requested.user_id AS requested_user_id",
        "requested.username AS requested_username",
        "requester.user_id AS requester_user_id",
        "requester.username AS requester_username"
    ])
    .getRawMany();
    
const result$ = requestedFriends.map(friendship => {
    if (friendship.requester_user_id === userId) {
        return {
            user_id: friendship.requested_user_id,
            username: friendship.requested_username
        };
    } else {
        return {
            user_id: friendship.requester_user_id,
            username: friendship.requester_username
        };
    }
});

  if (result$.length===0) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
      select : ["username","email"]
    });

    return {status :HttpStatus.FORBIDDEN, result : null,user : user}

  } else{

   const user = await this.userRepository.findOne({
    where: { user_id: userId },
    select : ["username","email"]
  });
    const result = result$.filter(user => user.user_id !== reqUserId)
    return {status :HttpStatus.OK,result : result,user : user}
  }

   
    
    
  }
 
}

async searchUsers(req : any, searchDto: SearchDto): Promise<any> {
  const user_id = (req.user as tokenUser).sub
  
  const blockedFriendships = await this.friendshipRepository.createQueryBuilder("friendship")
    .select(["friendship.requester_id", "friendship.requested_id"])
    .where('friendship.status_id = 3')
    .getRawMany();

  
    const blockedUserIds = blockedFriendships.reduce((acc, curr) => {
      if (!acc.includes(curr.friendship_requester_id)) acc.push(curr.friendship_requester_id);
      if (!acc.includes(curr.friendship_requested_id)) acc.push(curr.friendship_requested_id);
      return acc;
    }, []);
  console.log(blockedUserIds);
  
  const queryBuilder = await this.userRepository.createQueryBuilder("user")
  .select(['user.username', 'user.user_id'])
  .leftJoinAndSelect('user.sentFriendships', 'sentFriendships', 'sentFriendships.requested_id = :userId', { userId: user_id })
  .addSelect(['sentFriendships.requester_id'])  
  .leftJoinAndSelect('user.requestedFriendships', 'requestedFriendships', 'requestedFriendships.requester_id = :userId', { userId: user_id })
  .addSelect(['requestedFriendships.requested_id'])  
  .where('user.username like :search', { search: `%${searchDto.content}%` });


  
  if (blockedUserIds.length) {
    queryBuilder.andWhere('user.user_id NOT IN (:...blockedUserIds)', { blockedUserIds });
  }

  const users = (await queryBuilder.getMany()) as UserWithSimilarity[];

  users.forEach(user => {
    user.similarity = stringSimilarity.compareTwoStrings(searchDto.content, user.username);
  });

  users.sort((a, b) => b.similarity - a.similarity);
  console.log( users);
  
  return users;
}

async search4ChatService ( searchData : string) : Promise<any>{
  const resultSearch = await this.userRepository
  .createQueryBuilder('user')
  .select(['user.username', 'user.user_id'])
  .where('user.username LIKE :searchData', { searchData: `%${searchData}%` })
  // .getMany();

  const users = (await resultSearch.getMany()) as UserWithSimilarity[];

  users.forEach(user => {
    user.similarity = stringSimilarity.compareTwoStrings(searchData, user.username);
  });

  users.sort((a, b) => b.similarity - a.similarity);
  return users
  
}


async checkStatus(@Req() req: Request, @Res() res: Response): Promise<any> {
  const accessToken = req.cookies.access_jwt;
  const refreshToken = req.cookies.refresh_jwt;
console.log(accessToken)
console.log(refreshToken)

  




}

async validateUser(payload: any): Promise<any> {
  const user = await this.userRepository.findOne({where :{ user_id: payload.sub, username: payload.username }});
  if (!user) {
    return false;
  }
  return true;
}

async getRefreshToken(userId: string): Promise<string | undefined> {
  const user = await this.userRepository.findOne({ where : {user_id :userId }});
  if (!user?.refresh_token) {
    return undefined;
  }

  const decoded = decode(user.refresh_token);
  
  if (!decoded || typeof decoded === 'string' || decoded.exp * 1000 < Date.now()) {
    return undefined;
  }

  try {
    verify(user.refresh_token, jwtConstants.secret);
  } catch (e) {
    return undefined;
  }
  return user?.refresh_token;
}
  
async generateAccessToken(payload : any,@Res({ passthrough: true }) res: Response) : Promise<void>{
  const dataUser = { sub: payload.user_id, username: payload.username, role: payload.role };
  const refresh_token = await this.jwtService.signAsync(dataUser, { expiresIn: '7d' });
  const accessCookie = serialize('access_jwt', refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3600,  
    path: '/',
  });
  
  res.setHeader('Set-Cookie', accessCookie);

}

async findUserInRoom( idRoom : string) : Promise <any>{
  const usersId = idRoom.split("-")
  const users = await this.userRepository.createQueryBuilder("user")
  .select(["user.user_id","user.username"])
  .where("user.user_id IN (:...usersId)",{usersId})
  .getMany()  

  return users
  
}
 
}

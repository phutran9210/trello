import { Controller, Get, Post, Body, Patch, Param, Query,UsePipes,HttpException,HttpStatus,Res,UseGuards,Req,UseInterceptors,ClassSerializerInterceptor,ValidationPipe,BadRequestException } from '@nestjs/common';
import { Response,Request} from 'express';
import {ParseRegistrationPipe} from "../pipes/register.pipe"
import { UserService } from './user.service';
import { CreateUserDto, UserResponse,ReConfirmUser,UserProfile } from './dto/create-user.dto';
// import {JwtAuthGuardCheck} from "./guard/checkUser.guard"
// import {JwtAuthGuard} from "./guard/jwtAuthGuard.guard"
import {SearchDto} from "./dto/search.dto"
import {tokenUser} from "../user/interface/res.interface"
import {JwtStrategy} from "../auth_guard/JwtStrategy.guard"
import {JwtAuthGuardCheck} from "../auth_guard/checkExistJwt.guard"






@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtAuthGuardCheck)
  @Get(":userId")
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Req() req: Request,@Param("userId") userId : string) : Promise<any>{   
    console.log("????",req.user);
    
 return this.userService.getOneUser(req,userId)

  }


  @Post()
  // @UsePipes(ParseRegistrationPipe)
 async registerUser(@Body(new ValidationPipe() ) createUserDto: CreateUserDto) {
  console.log("?????");
  
    try {
      const result = await this.userService.create(createUserDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  
  @Get('confirm/activate')
  async validateCodeController(@Query('userId') userId: string, @Query('code') token: string,) {
    if (userId || ! token) {
      throw new BadRequestException('userId and code are required.');
    }
    const isValid = await this.userService.validateCode(userId, token);

    if (!isValid) {
      throw new HttpException("Mã không hợp lệ hoặc hết hạn", HttpStatus.BAD_REQUEST) 
    }
    return {
      message: 'Verification code is valid',
      status: 200,
    };
  }

  @Post("login")
  async login(@Body() userData: { password: string, username: string },@Res({ passthrough: true }) res: Response): Promise<UserResponse> {
    console.log("login????");
    
    return this.userService.userLogin(userData,res)
  }

  @UseGuards(JwtAuthGuardCheck)
  @Post("logout")
  async logout(@Req() request: Request, @Res({ passthrough: true }) res: Response) : Promise<any>{
   return this.userService.userLogout(request, res);
  
  }

  @Post("reconfirm")
  async reconfirm (@Body() userData : { password: string, username: string }) : Promise <ReConfirmUser>{
    return this.userService.createCode(userData)
  }
  
  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Post("searchUser")
  async searchSomething(@Req() req: Request,@Body() searchDto: SearchDto) : Promise <any>{
    console.log(req.user);
    
    return this.userService.searchUsers(req,searchDto);
  }

  @UseGuards(JwtAuthGuardCheck)
  @Post("createchatsearch")
  async search4chat(@Body("data") search : string) : Promise<any>{
    return await this.userService.search4ChatService(search)
  }

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Post("get-token")
  async getToken (@Req() req : Request) : Promise<{username : string, userId : string}>{
    const userId = (req.user as tokenUser).sub
    const username = (req.user as tokenUser).username
    return {username : username, userId : userId}
  }
  
  @Get("infor-in-room/:roomId")
  async getInfoInRoom(@Param("roomId") roomId : string) : Promise<any>{
  console.log(roomId);
  return await this.userService.findUserInRoom(roomId)
}

@Post("reconfirm/renewpassword")
async renewPassWord(@Body() email : any) : Promise<any>{
  return this.userService.renewPasswordService(email)
}

@Post("reconfirm/new-password")
async newPassword (@Body() data : any,@Res({ passthrough: true }) res: Response) : Promise<any>{
  return this.userService.renewPassword(data,res)
}

}


@Controller("auth/status")
export class StatusController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Get()
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken =  req.cookies.refresh_jwt;
    // console.log("đây là refresh",refreshToken);
    res.status(200).json("thành công")
    
  }
}
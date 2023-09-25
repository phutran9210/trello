import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../user/constain'; // Đảm bảo đường dẫn đúng
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("cookie",payload);
    
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username, role : payload.role };
  }
}

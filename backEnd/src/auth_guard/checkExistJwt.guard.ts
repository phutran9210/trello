import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../user/constain';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuardCheck implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies['access_jwt'];

    if (!token) {
      throw new UnauthorizedException('Token not found in cookie');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}

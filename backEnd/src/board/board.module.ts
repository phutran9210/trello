import * as cookieParser from 'cookie-parser';
import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {boardProvider} from "../providers/board.provider"
 import { DatabaseModule } from '../../database/database.module';
 import {JwtModule} from "@nestjs/jwt"
 import { jwtConstants } from '../user/constain';
 import {JwtStrategy} from "../auth_guard/JwtStrategy.guard"
@Module({
  imports : [DatabaseModule,JwtModule.register({ 
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360h', }, 
    }),],
  controllers: [BoardController],
  providers: [BoardService,...boardProvider,JwtStrategy]
})
export class BoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes(BoardController);
  }
}

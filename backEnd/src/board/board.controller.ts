import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe,UseGuards,Req,UnauthorizedException } from '@nestjs/common';
import {Request} from "express"
import { BoardService } from './board.service';
import {CreateBoardDto,CreateCardDto,CreateColumnDto} from "./dto/create-board.dto"
import { UpdateBoardDto } from './dto/update-board.dto';
import {JwtStrategy} from "../auth_guard/JwtStrategy.guard"
import {JwtAuthGuardCheck} from "../auth_guard/checkExistJwt.guard"
import {tokenUser} from "../user/interface/res.interface"



@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) : Promise<any> {
    return this.boardService.createBoard(createBoardDto);
  }

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Get("/:userId/myboard/:boardId")
  async getBoard(@Req() req: Request,@Param("userId") userId : string,@Param("boardId") boardId : string ) : Promise<any>{
    
    const user_id = (req.user as tokenUser).sub
    if (user_id !== userId) {
    throw new UnauthorizedException()
    }
    return this.boardService.getBoardData(req,userId,boardId)
  }

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Get("/:userId/myboard")
  async getAllBoard(@Req() req: Request,@Param("userId") userId : string) : Promise<any>{
    console.log("getData");
    
    const user_id = (req.user as tokenUser).sub
    if (user_id !== userId) {
    throw new UnauthorizedException()
    }
    return this.boardService.getBoardService(req,userId)
  }



  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Post("card")
  async createCard(@Req() req: Request,@Body() payload : CreateCardDto) : Promise<any>{
    return await this.boardService.createCardService(req,payload)
  }

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Post("column")
  async createColumn(@Req() req: Request,@Body() payload : CreateColumnDto) : Promise<any>{
    const user_id = (req.user as tokenUser).sub
    if (user_id !== payload.owner_column) {
    throw new UnauthorizedException()
    }

    return await this.boardService.createColumnService(req,payload)
  }

  @UseGuards(JwtAuthGuardCheck,JwtStrategy)
  @Patch("order-column")
  async changeColumn(@Body() orderData : any) : Promise<any>{
   return await this.boardService.changeOrderColumn(orderData)
  }


}

import { Injectable,Inject, HttpStatus, HttpException,Body,ValidationPipe,UnauthorizedException } from '@nestjs/common';
import {Repository, Transaction, EntityManager,In} from "typeorm"
import {InjectRepository,InjectEntityManager} from "@nestjs/typeorm"
import { CreateBoardDto,CreateCardDto,CreateColumnDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {Board} from "../board/entities/board.entity"
import {BoardUser} from "../board/entities/board_user.entity"
import {CardUser} from "../board/entities/card_user.entity"
import {Card} from "../board/entities/cards.entity"
import {ColumnInBoard} from "../board/entities/columns_in_board.entity"
import {Comment} from "../board/entities/comments.entity"
import { customAlphabet  } from 'nanoid';
import { v4 as uuidv4 } from 'uuid'
import {Request} from "express"
import {tokenUser} from "../user/interface/res.interface"

const nanoid = customAlphabet('1234567890abcdef', 10)


@Injectable()
export class BoardService {
  constructor(
    @Inject("BOARD_REPOSITORY")
    private boardRepository : Repository<Board>,
    @Inject("BOARD_USER_REPOSITORY")
    private board_userRepository : Repository<BoardUser>,
    @Inject("CARD_USER_REPOSITORY")
    private card_userRepository : Repository<CardUser>,
    @Inject("CARD_REPOSITORY")
    private cardRepository : Repository<Card>,
    @Inject("COLUM_IN_BOARD_REPOSITORY")
    private column_in_boardRepository : Repository<ColumnInBoard>,
    @Inject("COMMENT_REPOSITORY")
    private commentRepository : Repository<Comment>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ){}

  async createBoard( createBoardDto: CreateBoardDto): Promise<Board> {
    console.log(createBoardDto);
    const { title, description, type, ownerId, memberIds, canWriteMemberId } = createBoardDto;
    
    const id = uuidv4();
    const boardId = `board-id-${id}`;
    const newBoard = this.boardRepository.create({
      board_id: boardId, 
      title :title,
      description_board: description,
      owner_id : ownerId
    });

    const savedBoard = await this.boardRepository.save(newBoard);

    

    const permission =  this.board_userRepository.create({
        board_id : boardId,
        user_id : ownerId,
        permission : "write"
    })

    await this.board_userRepository.save(permission)
 

    // Add owner to the board_user table with 'write' permission
    await this.board_userRepository.save({
      board_id: savedBoard.board_id,
      user_id: ownerId,
      permission: 'write'
    });
    
    if (memberIds && memberIds.length) {
      const memberPromises = memberIds.map(id => {
        return this.board_userRepository.save({
          board_id: savedBoard.board_id,
          user_id: id,
          permission: 'read'
        });
      });
    
      await Promise.all(memberPromises);
    }

    if (canWriteMemberId && canWriteMemberId.length) {
      const canWriteMemberPromises = canWriteMemberId.map(id => {
        return this.board_userRepository.save({
          board_id: savedBoard.board_id,
          user_id: id,
          permission: 'write'
        });
      });
    
      await Promise.all(canWriteMemberPromises);
    }
    
    console.log("!!!!!");

    return savedBoard;
  }

async getBoardData (req : Request,userId : string, boardId : string) : Promise<any>{
console.log(userId,boardId);


const board = await this.boardRepository
    .createQueryBuilder('board')
    .leftJoin('board.owner', 'owner')
    .addSelect(['owner.user_id', 'owner.username'])

    .leftJoinAndSelect('board.boardUsers', 'boardUser')
    .leftJoin('boardUser.user', 'user')
    .addSelect(["user.user_id", "user.username"])
    .where('board.board_id = :boardId', { boardId })

    .leftJoinAndSelect("board.columns", "columns")
    .orderBy('columns.order_id', 'ASC')
    .leftJoin("columns.owner","columnUser")
    .addSelect(["columnUser.user_id", "columnUser.username"])

    .leftJoinAndSelect("board.cards", "cards")
    .addOrderBy("cards.card_order","ASC")
    .leftJoin("cards.owner", "cardUser") 
    .addSelect(["cardUser.user_id", "cardUser.username"])

    .leftJoinAndSelect("cards.comments","comments")
    .leftJoin("comments.owner", "commentUser") 
    .addSelect(["commentUser.user_id", "commentUser.username"])

    .getOne();

  if (!board) {
    throw new HttpException("Not found",HttpStatus.NOT_FOUND)
  }

  const ownerIds = board.boardUsers
    .filter(boardUser => boardUser.permission === 'write')
    .map(boardUser =>  ({
      "username": boardUser.user.username,
      "user_id": boardUser.user.user_id
    }));

  const memberIds = board.boardUsers
    .filter(boardUser => boardUser.permission === 'read')
    .map(boardUser => ({
      "username": boardUser.user.username,
      "user_id": boardUser.user.user_id
    }));
   
    const boardIdArray = board.columns.map(board => board.column_id);
    const copyBoard = {...board}
    delete copyBoard.boardUsers

     copyBoard.columns.forEach(column => {
      column.cards = copyBoard.cards.filter(card => card.column_id === column.column_id);
  });

  board.columns.forEach(column => {
    const cardsInColumn = column.cards;

    // Sắp xếp và lấy ra mảng card_id dựa trên card_order
    const sortedCardIds = cardsInColumn
        .sort((a, b) => a.card_order - b.card_order)
        .map(card => card.card_id);

        (column as any).cardOrderIds = sortedCardIds;
});
 
  delete copyBoard.cards;

  const resultData ={ board : {...copyBoard, 
    memberCanWrite : ownerIds,
    memberIds : memberIds,
    columnOrderIds : boardIdArray,
  
  }
}
  

  return resultData
}

async getBoardService ( req : Request, payload : string) : Promise<any>{  
  const user_id = (req.user as tokenUser).sub
  const boards = await this.boardRepository.find({where : {owner_id : user_id}})
  console.log(boards);
  const boardIds = boards.map(board => board.board_id);
  const tagBoardsId = await this.board_userRepository
        .createQueryBuilder("tagBoard")
        .select("tagBoard.board_id")
        .where("tagBoard.user_id = :user_id", { user_id })
        .andWhere("tagBoard.board_id NOT IN (:...boardIds)", { boardIds })
        .getMany();
  
        const tagBoardIds = tagBoardsId.map(entry => entry.board_id);

        // Tìm các bảng dựa trên tagBoardIds
        const taggedBoards = await this.boardRepository.find({ where: { board_id: In(tagBoardIds) } });
    
        return {
          personalBoards: boards,
          taggedBoards: taggedBoards
        };

}

async createCardService (req : Request, payload : CreateCardDto) : Promise<any>{
  return await this.entityManager.transaction(async transactionalEntityManager => {
    const lastCard = await transactionalEntityManager
      .createQueryBuilder(Card, 'card')
      .orderBy('card.card_order', 'DESC')
      .getOne();

    const user_id = (req.user as tokenUser).sub


    const newOrder = lastCard ? lastCard.card_order + 1 : 1;
     const id = uuidv4();
    const cardId = `cardId-id-${id}`;
    const card = new Card();
    card.title = payload.title;
    card.description = payload.description;
    card.board_id = payload.board_id;
    card.column_id = payload.column_id;
    card.owner_card = user_id; 
    card.card_order = newOrder;
    card.card_id = cardId
    return await transactionalEntityManager.save(card);
  });
}

async createColumnService (req : Request, payload : CreateColumnDto) : Promise<any>{
  console.log(payload);
  
  const user_id = (req.user as tokenUser).sub

  const checkPermission = await this.board_userRepository.findOne({where :{user_id : user_id,permission : "write"}})
  if (!checkPermission) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  const lastColumn = await this.column_in_boardRepository
  .createQueryBuilder('column')
  .orderBy('column.order_id', 'DESC')
  .getOne();

  const newOrder = lastColumn ? lastColumn.order_id + 1 : 1;

  const id = uuidv4();
  const columnId = `column-id-${id}`;

  const newColumn = this.column_in_boardRepository.create({
    ...payload,
    column_id : columnId,
    order_id : newOrder
  })

  const result = await this.column_in_boardRepository.save(newColumn)
  
  return {
    message : "Success",
    status : HttpStatus.CREATED,
    newColumn : result
  }
  
}

async changeOrderColumn ( data : any) : Promise<any>{
  const columns = await this.column_in_boardRepository.find({ where: { board_id: data.board_id } });
    
  if (!columns || columns.length === 0) {
    throw new HttpException('No columns found for the specified board_id',HttpStatus.NOT_FOUND);
  }

  for (let i = 0; i < data.columnOrderIds.length; i++) {
    const columnId = data.columnOrderIds[i];
    const order = i + 1; 

    
    const columnToUpdate = columns.find(col => col.column_id === columnId);
    if (columnToUpdate) {
      columnToUpdate.order_id = order;
      await this.column_in_boardRepository.save(columnToUpdate);
    }
  }
  return new  HttpException("Order updated successfully",HttpStatus.OK)
}

}

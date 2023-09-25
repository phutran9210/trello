
import { IsString, IsNotEmpty, IsIn, IsUUID, IsArray, ArrayNotEmpty} from 'class-validator';
import {IsCustomUUID} from "../customDecorator/IsCustomUUID"

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn(['public', 'private'])
  type: 'public' | 'private';

  @IsNotEmpty()
  // @IsCustomUUID()
  ownerId: string;

  @IsArray()
  @ArrayNotEmpty()
  // @IsCustomUUID({ each: true })
  memberIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  // @IsCustomUUID({ each: true }) 
  canWriteMemberId: string[];
}

export class CreateCardDto{
  @IsNotEmpty()
  @IsString()
  title : string;

  @IsNotEmpty()
  @IsString()
  board_id : string;

  @IsNotEmpty()
  @IsString()
  description : string;

  @IsNotEmpty()
  @IsString()
  column_id : string
}

export class CreateColumnDto{
  @IsNotEmpty()
  @IsString()
  title : string;

  @IsNotEmpty()
  @IsString()
  board_id : string;

  @IsNotEmpty()
  @IsString()
  owner_column : string;
}
interface PayloadCard {
  title : string,
  description : string,
  board_id : string,
  column_id : string, 
}



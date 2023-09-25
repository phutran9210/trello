
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Board } from './board.entity';
import {Card} from "./cards.entity"
import {User} from "../../user/entities/user.entity"
@Entity('column_in_board')
export class ColumnInBoard {
  @PrimaryColumn()
  column_id: string;

  @Column()
  board_id: string;

  @Column({ length: 255 })
  title: string;

  @Column('int', { nullable: true, default: 1  })
  order_id: number;

  @ManyToOne(() => Board, board => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner_column: string;

  @OneToMany(() => Card, card => card.column)
    cards: Card[];

    @ManyToOne(() => User, user => user.columns)
    @JoinColumn({ name: 'owner_column' })
    owner: User;
}

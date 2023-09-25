import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import {Board} from "./board.entity"
import {ColumnInBoard} from "./columns_in_board.entity"
import {Comment} from "./comments.entity"
import {CardUser} from "./card_user.entity"
import {User} from "../../user/entities/user.entity"


  @Entity('cards')
  export class Card {
    @PrimaryColumn()
    card_id: string;
  
    @Column()
    board_id: string;
  
    @Column()
    column_id: string;
  
    @Column({ length: 255 })
    title: string;
  
    @Column('text', { nullable: true })
    description: string;
  
    @Column({ length: 512, nullable: true })
    cover: string;

    @Column('varchar', { length: 255 })
    owner_card: string;

    @Column({ default: 1 })
    card_order : number;
  
    @ManyToOne(() => Board, board => board.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_id' })
    board: Board;
  
    @ManyToOne(() => ColumnInBoard, column => column.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'column_id' })
    column: ColumnInBoard;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[];

    @OneToMany(() => CardUser, cardUser => cardUser.card)
    cardUsers: CardUser[];

    @ManyToOne(() => User, user => user.cards)
    @JoinColumn({ name: 'owner_card' })
    owner: User;
  }
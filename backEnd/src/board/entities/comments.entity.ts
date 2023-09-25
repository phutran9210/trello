import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { Card } from './cards.entity';
import {User} from "../../user/entities/user.entity"

  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;
  
    @Column()
    card_id: string;
  
    @Column('text')
    content: string;
  
    @ManyToOne(() => Card, card => card.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "card_id" })
    card: Card;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'owner_comment' })
    owner: User;
  }
  
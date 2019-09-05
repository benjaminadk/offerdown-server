import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { User } from './User'
import { Message } from './Message'
import { Item } from './Item'

@Entity('offers')
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() createdAt: string

  @Column('uuid') userId: string

  @ManyToOne(() => User, user => user.offers) user: User

  @Column('uuid') itemId: string

  @ManyToOne(() => Item) item: Item

  @OneToMany(() => Message, message => message.offer, { eager: true }) messages: Message[]
}

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

  @Column('uuid') sellerId: string

  @ManyToOne(() => User, user => user.selling) seller: User

  @Column('uuid') buyerId: string

  @ManyToOne(() => User, user => user.buying) buyer: User

  @Column('uuid') itemId: string

  @ManyToOne(() => Item) item: Item

  @OneToMany(() => Message, message => message.offer, { eager: true }) messages: Message[]
}

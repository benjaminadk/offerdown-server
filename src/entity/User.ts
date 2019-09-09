import * as bcrypt from 'bcryptjs'
import * as md5 from 'md5'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm'
import { Item } from './Item'
import { Offer } from './Offer'
import { Message } from './Message'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() createdAt: string

  @Column('varchar', { length: 100 }) email: string

  @Column('varchar', { length: 100 }) name: string

  @Column('text') password: string

  @Column('varchar', { length: 255 }) image: string

  @Column('varchar', { length: 100 }) location: string

  @Column('double precision') latitude: number

  @Column('double precision') longitude: number

  @Column('boolean', { default: false }) confirmed: boolean

  @Column('boolean', { default: false }) forgotPasswordLocked: boolean

  @OneToMany(() => Item, item => item.user) items: Item[]

  @OneToMany(() => Offer, offer => offer.seller) selling: Offer[]

  @OneToMany(() => Offer, offer => offer.buyer) buying: Offer[]

  @OneToMany(() => Message, message => message.user) messages: Message[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @BeforeInsert()
  async createImageUrl() {
    this.image = `https://www.gravatar.com/avatar/${md5(this.email)}?d=mp`
  }
}

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

import { User } from './User'
import { Offer } from './Offer'

export enum Category {
  APPLIANCES = 'APPLIANCES',
  BABY_KID = 'BABY_KID',
  CAR_TRUCK = 'CAR_TRUCK',
  CELL_PHONES = 'CELL_PHONES',
  CLOTHING_SHOES = 'CLOTHING_SHOES',
  FURNITURE = 'FURNITURE',
  GAMES_TOYS = 'GAMES_TOYS',
  GENERAL = 'GENERAL',
  SPORTS_OUTDOORS = 'SPORTS_OUTDOORS',
  TOOLS = 'TOOLS'
}

export enum Condition {
  NEW = 'NEW',
  RECONDITIONED = 'RECONDITIONED',
  GREAT = 'GREAT',
  GOOD = 'GOOD',
  POOR = 'POOR'
}

@Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() createdAt: string

  @Column('varchar', { length: 100 }) name: string

  @Column('varchar', { length: 500 }) description: string

  @Column('enum', { enum: Category }) category: Category

  @Column('enum', { enum: Condition }) condition: Condition

  @Column('int') price: number

  @Column('simple-array') images: string[]

  @Column('bool', { default: false }) isAd: boolean

  @Column('uuid') userId: string

  @ManyToOne(() => User) user: User

  @OneToMany(() => Offer, offer => offer.item) offers: Offer[]
}

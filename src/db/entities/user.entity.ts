import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {

  @PrimaryColumn()
  id: number

  @Column()
  username: string

  @Column()
  fullname: string

  @Column()
  password: string

}

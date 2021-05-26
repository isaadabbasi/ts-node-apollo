import { Entity, Column } from 'typeorm'
import { Base } from './base.entity'

@Entity()
export class User extends Base {

  @Column()
  username: string

  @Column()
  fullname: string

  @Column()
  password: string

}

import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BaseEntity } from 'typeorm'
import { v4 } from 'uuid'

@Entity()
export class Base extends BaseEntity {

  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  addId(): void {
    this.id = this.id ? this.id : v4()
  }

}

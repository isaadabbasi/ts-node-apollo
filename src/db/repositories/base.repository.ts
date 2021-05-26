import * as _ from 'lodash'
import { DeepPartial, DeleteResult, EntityTarget, FindConditions, FindManyOptions, FindOneOptions, getConnection, Repository, SaveOptions, UpdateResult } from 'typeorm'

import { Nullable, GqlTypes } from '@src/defs'
import { TYPEORM_CONNECTION } from '@src/env'
import { fp } from '@src/utils'

export class BaseRepository<T> {
  
  private readonly entity: EntityTarget<T>
  private repository: Repository<T>
  
  public constructor(entity: EntityTarget<T>) {
    this.entity= entity
  }

  protected getRepository(): Repository<T> {
    if (this.repository)
      return this.repository

    const repository = getConnection(TYPEORM_CONNECTION).getRepository(this.entity)
    this.repository = repository
    return repository
  }

  public delete(opts: FindConditions<T>): Promise<DeleteResult> {
    return this.getRepository().delete(opts)
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.getRepository().delete(id)
  }

  public find(opts: FindManyOptions<T>): Promise<T[]> {
    return this.getRepository().find(opts)
  }

  public findOne(opts: FindOneOptions<T>): Promise<GqlTypes.Maybe<T>> {
    return this.getRepository().findOne(opts)
      .then(fp.thruIf<Nullable<T>>(_.isNil)(fp.N))
  }

  public findById(id: string): Promise<GqlTypes.Maybe<T>> {
    return this.getRepository().findOne(id)
      .then(fp.thruIf<Nullable<T>>(_.isNil)(fp.N))
  }

  public save(entity: DeepPartial<T>, opts?: SaveOptions): Promise<T> {
    return this.getRepository().save(entity, opts)
  }

  public updateOneById(id: string, entity: DeepPartial<T>): Promise<UpdateResult> {
    return this.getRepository().update(id, entity)
  }
  
  public update(opts: FindConditions<T>, entity: DeepPartial<T>): Promise<UpdateResult> {
    return this.getRepository().update(opts, entity)
  }

}

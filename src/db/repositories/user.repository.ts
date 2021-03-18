import { getConnection, Repository } from 'typeorm'
import { entities } from '@src/db'
import { TYPEORM_CONNECTION } from '@src/env'

let cachedUserRepository: Repository<entities.User>
export function getUserRepository(): Repository<entities.User> {
  if (cachedUserRepository) {
    return cachedUserRepository
  }

  const repo = getConnection(TYPEORM_CONNECTION).getRepository(entities.User)
  cachedUserRepository = repo
  return repo
}

export function getUserList(): Promise<Array<entities.User>> {
  return getUserRepository().find({})
}
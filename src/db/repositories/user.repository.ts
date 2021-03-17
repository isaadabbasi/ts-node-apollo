import { getConnection, getRepository, Repository } from 'typeorm'
import { User } from '../entities'
import { TYPEORM_CONNECTION } from '../../env'

let cachedUserRepository: Repository<User>
export function getUserRepository(): Repository<User> {
  if (cachedUserRepository) {
    return cachedUserRepository
  }

  const repo = getConnection(TYPEORM_CONNECTION).getRepository(User)
  cachedUserRepository = repo
  return repo
}

export function getUserList(): Promise<Array<User>> {
  return getUserRepository().find({})
}
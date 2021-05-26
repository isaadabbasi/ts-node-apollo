import { entities } from '@src/db'
import { BaseRepository } from './base.repository'

class UserRepository extends BaseRepository<entities.User> {

  constructor() {
    super(entities.User)
  }

}

export const userRepository = new UserRepository()

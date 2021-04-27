import * as argon2 from 'argon2'
import * as fs from 'fs'
import { skip } from 'graphql-resolvers'

import { AppErrors } from '@src/graphql/errors'
import { ApolloCtx } from '@src/defs'
 
// * Path is relative to Server.js file in base dir
export const PRIVATE_KEY = fs.readFileSync('./bin/jwtRS256.key', 'utf8')
export const PUBLIC_KEY = fs.readFileSync('./bin/jwtRS256.key.pub', 'utf8')

export const generateRandomCode = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function verifyHash(hash: string, text: string): Promise<boolean> {
  return argon2.verify(hash, text)
}

export const requireJwtAuth = (_: any, args: any, ctx: ApolloCtx): any => {
  const user = ctx.user
  return user ? skip : AppErrors.buildAuthError()
}

import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { TokenPayload } from './types/auth/TokenPayload'
import db from './db'

import { RefreshToken } from '@/models/RefreshToken'

export const generateToken = async (
  tokenPayload: TokenPayload
): Promise<string> => {
  return await jwt.sign(tokenPayload, <string>process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

export const generateRefreshToken = async (
  account_id: string
): Promise<string> => {
  // Delete old refresh tokens
  await db<RefreshToken>('refresh_tokens').where({ account_id }).del()

  // Generate new refresh token
  const [refreshToken]: string = await db<RefreshToken>('refresh_tokens')
    .returning('refresh_token')
    .insert({
      refresh_token: uuidv4(),
      account_id,
    })
  return refreshToken
}

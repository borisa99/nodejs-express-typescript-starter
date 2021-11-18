import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

import { TokenPayload } from './types/auth/TokenPayload'
import db from './db'

import { RefreshToken } from '@/models/RefreshToken'

export const generateTokenPayload = (account_id: string): TokenPayload => {
  const tokenPayload: TokenPayload = {
    id: account_id,
    email: '',
    first_name: '',
    last_name: '',
    avatar_url: '',
    roles: [],
  }

  return tokenPayload
}

export const generateToken = async (account_id: string): Promise<string> => {
  return await jwt.sign(
    await generateTokenPayload(account_id),
    <string>process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )
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
      expires_at: dayjs().add(1, 'day').toDate(),
      account_id,
    })
  return refreshToken
}

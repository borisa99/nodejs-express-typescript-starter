import jwt from 'jsonwebtoken'
import { TokenPayload } from './types/auth/TokenPayload'

export const generateToken = async (tokenPayload: TokenPayload) => {
  return await jwt.sign(tokenPayload, <string>process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

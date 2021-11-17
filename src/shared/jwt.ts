import jwt from 'jsonwebtoken'

export const generateToken = async (tokenPayload: any) => {
  return await jwt.sign(tokenPayload, <string>process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

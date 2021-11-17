import { Service } from 'typedi'
import { IAuthService } from './IAuthService'
import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import db from '@/shared/db'

import { ServiceResponse } from '@/models/ServiceResponse'
import { Account } from '@/models/Account'

import { hashPassword } from '@shared/bcrypt'

@Service()
export class AuthService implements IAuthService {
  async register(user: RegisterUser): Promise<ServiceResponse<string>> {
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    try {
      //Check if user already exists
      const account = await db<Account>('accounts')
        .where({ email: user.email })
        .first()
      if (account) {
        response.status = 400
        response.error = 'Email already exists'
        return response
      }
      const hashedPassword = await hashPassword(user.password)
      console.log(
        '🚀 ~ file: AuthService.ts ~ line 26 ~ AuthService ~ register ~ hashedPassword',
        hashedPassword
      )
      response.payload = 'Success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
}

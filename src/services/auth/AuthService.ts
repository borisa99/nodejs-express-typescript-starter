import { Service } from 'typedi'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { IAuthService } from './IAuthService'
import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import db from '@/shared/db'

import { ServiceResponse } from '@/models/ServiceResponse'
import { Account } from '@/models/Account'
import { User } from '@/models/User'

import { hashPassword } from '@shared/bcrypt'
import { AccountRole } from '@/models/AccountRole'
import { RoleValue } from '@/models/RoleValue'

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
      //TODO - check if requested roles are valid
      //Create new user
      const [user_id]: string = await db<User>('users').returning('id').insert({
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
      })

      //Create new account
      const ticket = uuidv4()
      const [account_id]: string = await db<Account>('accounts')
        .returning('id')
        .insert({
          user_id,
          email: user.email,
          password_hash: await hashPassword(user.password),
          ticket,
          ticket_expires_at: dayjs().add(1, 'day').toDate(),
        })

      // Insert account roles
      const accountRoles = user.roles.map((role: RoleValue) => {
        return {
          account_id,
          role,
        }
      })
      await db<AccountRole>('account_roles').insert(accountRoles)

      response.payload = 'Success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
}

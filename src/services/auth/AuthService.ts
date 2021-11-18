import { Service } from 'typedi'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { IAuthService } from './IAuthService'
import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import db from '@/shared/db'

import { ServiceResponse } from '@/models/ServiceResponse'
import { Account } from '@/models/Account'
import { User } from '@/models/User'
import { AccountRole } from '@/models/AccountRole'
import { RoleValue } from '@/models/RoleValue'

import { hashPassword, verifyPassword } from '@shared/bcrypt'
import { mailer } from '@shared/email'
import { JWT } from '@/shared/types/auth/JWT'
import { generateRefreshToken, generateToken } from '@/shared/jwt'
@Service()
export class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<ServiceResponse<JWT>> {
    const response: ServiceResponse<JWT> = new ServiceResponse<JWT>()
    try {
      const account = await db<Account>('accounts').where({ email }).first()
      if (!account) {
        response.status = 400
        response.error = 'Account does not exist'
        return response
      }
      if (!account.is_active) {
        response.status = 400
        response.error = 'Account is not activated'
        return response
      }
      if (!(await verifyPassword(password, account.password_hash))) {
        response.status = 400
        response.error = 'Invalid password'
        return response
      }
      response.payload = {
        token: await generateToken(account.id),
        refresh_token: await generateRefreshToken(account.id),
      }
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
  // Activate user account
  async activate(ticket: string): Promise<ServiceResponse<string>> {
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    try {
      // Get account by ticket
      const account = await db<Account>('accounts').where({ ticket }).first()

      // if account not found
      if (!account) {
        response.status = 400
        response.error = 'Account does not exist'
        return response
      }
      // if account is already activated
      if (
        account.ticket_expires_at &&
        account.ticket_expires_at < dayjs().toDate()
      ) {
        response.status = 400
        response.error = 'Ticket expired'
        return response
      }
      // Activate account
      await db<Account>('accounts').where({ ticket }).update({
        ticket: null,
        ticket_expires_at: null,
        is_active: true,
      })
      response.payload = 'success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
  // Register new user
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

      //Send email
      await mailer.sendMail({
        from: 'from@me.com',
        to: user.email,
        subject: 'Activate account',
        html: `<a href="http://${process.env.HOST}/api/auth/activate?ticket=${ticket}">Activate account</a>`,
      })

      response.payload = 'success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
}

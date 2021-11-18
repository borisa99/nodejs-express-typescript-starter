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
import { emailClient } from '@shared/email'
import { JWT } from '@/shared/types/auth/JWT'
import { generateRefreshToken, generateToken } from '@/shared/jwt'
import { RefreshToken } from '@/models/RefreshToken'
import { validateAccount, updateTicket } from '@/shared/account'
import { AccountValidation } from '@/shared/types/auth/AccountValiation'
@Service()
export class AuthService implements IAuthService {
  async requestPasswordReset(email: string): Promise<ServiceResponse<string>> {
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    try {
      // Get account by email
      const account = await db<Account>('accounts').where({ email }).first()

      // if account not found
      const accountValidation: AccountValidation = validateAccount(
        true,
        account
      )
      if (!accountValidation.is_valid) {
        response.status = 400
        response.error = accountValidation.message
        return response
      }
      // Generate ticket
      const ticket = uuidv4()
      await updateTicket(account?.id, ticket)

      // Send email
      await emailClient.send({
        template: 'lost-password',
        message: {
          to: account?.email,
          headers: {
            'x-ticket': {
              prepared: true,
              value: ticket,
            },
          },
        },
        locals: {
          ticket,
        },
      })
      response.payload = 'Success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
  async refresh(refresh_token: string): Promise<ServiceResponse<JWT>> {
    const response: ServiceResponse<JWT> = new ServiceResponse<JWT>()
    try {
      // Get account by refresh token
      const account = await db<RefreshToken>('refresh_tokens')
        .where({ refresh_token })
        .leftJoin('accounts', 'accounts.id', 'refresh_tokens.account_id')
        .first()
      // if account not found
      if (!account) {
        response.status = 400
        response.error = 'Invalid refresh token'
        return response
      }

      // TODO if refresh token is expired

      //
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
  async login(email: string, password: string): Promise<ServiceResponse<JWT>> {
    const response: ServiceResponse<JWT> = new ServiceResponse<JWT>()
    try {
      const account = await db<Account>('accounts').where({ email }).first()
      // if account not found
      if (!account) {
        response.status = 400
        response.error = 'Account does not exist'
        return response
      }
      // if account is not active
      if (!account.is_active) {
        response.status = 400
        response.error = 'Account is not activated'
        return response
      }

      // if password is incorrect
      if (!(await verifyPassword(password, account.password_hash))) {
        response.status = 400
        response.error = 'Invalid password'
        return response
      }
      // Sign token and send to client
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
  async activate(ticket: string): Promise<ServiceResponse<string>> {
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    try {
      // Get account by ticket
      const account = await db<Account>('accounts').where({ ticket }).first()
      const frontend_url = process.env.FRONTEND_URL

      // if account not found
      if (!validateAccount(false, account).is_valid) {
        response.status = 302
        response.payload = frontend_url + '/not-found'
        return response
      }

      // if ticket is expired
      if (
        account?.ticket_expires_at &&
        account.ticket_expires_at < dayjs().toDate()
      ) {
        response.status = 302
        response.payload = frontend_url + '/expired'
        return response
      }
      // Activate account
      await db<Account>('accounts').where({ ticket }).update({
        ticket: null,
        ticket_expires_at: null,
        is_active: true,
      })
      response.status = 302
      response.payload = frontend_url + '/success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
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
      await emailClient.send({
        template: 'activate-account',
        message: {
          to: user.email,
          headers: {
            'x-ticket': {
              prepared: true,
              value: ticket,
            },
          },
        },
        locals: {
          display_name: user.first_name + ' ' + user.last_name,
          url: `http://${process.env.HOST}/api/auth/activate?ticket=${ticket}`,
        },
      })

      response.payload = 'success'
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
}

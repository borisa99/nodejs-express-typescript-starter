import { Account } from '@models/Account'
import { AccountValidation } from './types/auth/AccountValiation'

export const validateAccount = (
  should_be_active: boolean,
  account?: Account
): AccountValidation => {
  const response: AccountValidation = {
    is_valid: true,
    message: '',
  }
  if (!account) {
    response.message = 'Account not found'
    response.is_valid = false
  }
  if (should_be_active && account && !account.is_active) {
    response.message = 'Account is not active'
    response.is_valid = false
  }
  if (!should_be_active && account && account.is_active) {
    response.message = 'Account is active'
    response.is_valid = false
  }
  return response
}

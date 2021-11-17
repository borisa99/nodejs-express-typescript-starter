import { Service } from 'typedi'
import { IAuthService } from './IAuthService'
import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import { ServiceResponse } from '@/models/ServiceResponse'

@Service()
export class AuthService implements IAuthService {
  async register(user: RegisterUser): Promise<ServiceResponse<string>> {
    console.log('Registering user: ', user)
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    return response
  }
}

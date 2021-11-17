import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import { ServiceResponse } from '@models/ServiceResponse'

export interface IAuthService {
  register(user: RegisterUser): Promise<ServiceResponse<string>>
}

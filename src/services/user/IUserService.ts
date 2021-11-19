import { GetUserPayload } from '@/shared/types/auth/GetUserPayload'

export interface IUserService {
  me(): Promise<GetUserPayload>
}

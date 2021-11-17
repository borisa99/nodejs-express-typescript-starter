import { RoleValue } from '@/models/RoleValue'

export interface TokenPayload {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string
  roles: RoleValue[]
}

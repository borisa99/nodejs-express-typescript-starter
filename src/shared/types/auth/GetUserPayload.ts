import { RoleValue } from '@/models/RoleValue'

export interface GetUserPayload {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string
  roles: RoleValue[]
}

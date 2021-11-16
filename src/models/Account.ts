export interface Account {
  id: string
  email: string
  password_hash: string
  ticket: string
  ticket_expires_at: Date
  is_active: boolean
  user_id: string
  created_at: Date
  updeted_at: Date
}

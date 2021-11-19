import { UserService } from '@/services/user/UserService'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { Service } from 'typedi'
import { Response } from 'express'
import { AuthRequest } from '@/shared/types/auth/AuthRequest'

@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  me = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { account_id } = req.user
      serviceResponseHandler(res, await this.userService.me(account_id))
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

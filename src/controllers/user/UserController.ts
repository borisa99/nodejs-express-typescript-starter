import { UserService } from '@/services/user/UserService'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { Service } from 'typedi'
import { Response } from 'express'
import { Request } from 'express-serve-static-core'

@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  me = async (req: Request, res: Response): Promise<void> => {
    try {
      // const { account_id } = req.user
      serviceResponseHandler(
        res,
        await this.userService.me('15fa8e6f-fa38-45cc-94c2-0c5ec98ba61b')
      )
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

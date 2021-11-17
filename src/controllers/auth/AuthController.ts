import { Request, Response } from 'express'
import { Service } from 'typedi'
import { AuthService } from '@services/auth/AuthService'
import { serviceResponseHandler } from '@shared/serviceResponseHandler'

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body
      serviceResponseHandler(res, await this.authService.register(user))
    } catch (error) {
      res.status(500).send(error)
    }
  }
  public activate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ticket } = req.query
      serviceResponseHandler(
        res,
        await this.authService.activate(<string>ticket)
      )
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

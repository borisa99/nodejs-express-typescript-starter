import express, { Request, Response } from 'express'
import { validate } from './middleware/requestValidator'
import auth from './middleware/auth'
import { RouterWrapperParams } from './shared/types/RouterWrapperParams'

// Create the express app
const expressRouter = express.Router()
export const router = {
  use(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.use(routeName, validate, func)
  },
  get(params: RouterWrapperParams) {
    expressRouter.get(
      params.routeName,
      validate,
      auth(params.allowedRoles, params.isPublic),
      params.handler
    )
  },
  post(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.post(routeName, validate, func)
  },
  put(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.put(routeName, validate, func)
  },
  delete(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.delete(routeName, validate, func)
  },
  getInstance() {
    return expressRouter
  },
}

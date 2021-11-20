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
  post(params: RouterWrapperParams) {
    expressRouter.post(
      params.routeName,
      validate,
      auth(params.allowedRoles, params.isPublic),
      params.handler
    )
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

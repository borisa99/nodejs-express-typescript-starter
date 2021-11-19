import express, { Request, Response } from 'express'
import { validate } from './middleware/requestValidator'
import auth from './middleware/auth'
import { RoleValue } from './models/RoleValue'

// Create the express app
const expressRouter = express.Router()
export const router = {
  use(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.use(routeName, validate, func)
  },
  get(
    routeName: string,
    func: (req: Request, res: Response) => void,
    allowedRoles: RoleValue[] = []
  ) {
    expressRouter.get(routeName, validate, auth(allowedRoles), func)
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

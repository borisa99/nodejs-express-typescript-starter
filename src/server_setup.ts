import express, { Request, Response } from 'express'
import cors from 'cors'
import { validate } from './middleware/requestValidator'
// Create the express app
const app = express()
const router = express.Router()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get('/health', (req: Request, res: Response) => {
  res.send('OK')
})

const customRouterInstance = {
  get(routeName: string, func: (req: Request, res: Response) => void) {
    router.get(routeName, validate, func)
  },
  use(routeName: string, func: (req: Request, res: Response) => void) {
    router.use(routeName, validate, func)
  },

  post(routeName: string, func: (req: Request, res: Response) => void) {
    router.post(routeName, validate, func)
  },
  getRouter() {
    return router
  },
}
export { app, router, customRouterInstance }

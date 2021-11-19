import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import { validate } from './middleware/requestValidator'
// Create the express app
const app = express()
const expressRouter = express.Router()

// Middleware
const corsOptions: CorsOptions = {
  origin: process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.split(','),
  methods: ['GET', 'POST'],
}
// Configure for development
if (process.env.NODE_ENV === 'development') {
  corsOptions.origin = '*'
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.get('/health', (req: Request, res: Response) => {
  res.send('OK')
})

// Router wrapper
const router = {
  use(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.use(routeName, validate, func)
  },
  get(routeName: string, func: (req: Request, res: Response) => void) {
    expressRouter.get(routeName, validate, func)
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

export { app, expressRouter, router }

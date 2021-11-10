import express, { Request, Response } from 'express'
import cors from 'cors'
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

export { app, router }

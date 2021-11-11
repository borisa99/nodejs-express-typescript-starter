import { Application } from 'express'
import WeatherRouter from './weather/WeatherRouter'

export const initRoutes = (app: Application) => {
  app.use('/api/weather', WeatherRouter)
}

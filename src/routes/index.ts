import { Application } from 'express'
import WeatherRouter from './weather/Weather'

export const initRoutes = (app: Application) => {
  app.use('/api/weather', WeatherRouter)
}

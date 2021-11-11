import { Application } from 'express'
import WeatherRouter from './weather/weather.router'

export const initRoutes = (app: Application) => {
  app.use('/api/weather', WeatherRouter)
}

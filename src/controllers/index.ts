import Container from 'typedi'
import { WeatherController } from './weather/WeatherController'
import { AuthController } from './auth/AuthController'

const weatherController = Container.get(WeatherController)
const authController = Container.get(AuthController)

export { weatherController, authController }

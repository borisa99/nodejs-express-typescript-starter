import Container from 'typedi'
import { WeatherController } from './weather/WeatherController'

const weatherController = Container.get(WeatherController)

export { weatherController }

import { GetWeather } from '../../types/Weather'
import { ServiceResponse } from '../../models/ServiceResponse'
import { IWeatherService } from './IWeatherService'
export default class WeatherService implements IWeatherService {
  get(city: string): ServiceResponse<GetWeather> {
    const response = new ServiceResponse<GetWeather>()
    response.payload = {
      city,
      degrees: 20,
    }
    return response
  }
}

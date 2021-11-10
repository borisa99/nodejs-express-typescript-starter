import { GetWeather } from '../../types/Weather'
import { ServiceResponse } from '../../models/ServiceResponse'
export interface IWeatherService {
  get(city: string): ServiceResponse<GetWeather>
}

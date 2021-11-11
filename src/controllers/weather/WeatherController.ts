import { Request, Response } from 'express'
import WeatherService from '../../services/weather/WeatherService'
import { serviceResponseHandler } from '../../helpers/serviceResponseHandler'

export class WeatherController {
  private weatherService: WeatherService
  constructor() {
    this.weatherService = new WeatherService()
  }
  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city } = req.body
      serviceResponseHandler(res, await this.weatherService.get(city))
    } catch (error) {
      console.log(error)

      res.status(500).send(error)
    }
  }
}

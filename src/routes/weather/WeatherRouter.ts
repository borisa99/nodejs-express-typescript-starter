import { Request, Response } from 'express'
import { router } from '../../server_setup'
import { weatherController } from '../../controllers'
import { validate } from '../../middleware/requestValidator'
import weatherRouterRules from './WeatherRouterRules'

router.get(
  '/',
  validate(weatherRouterRules.get),
  (req: Request, res: Response) => weatherController.get(req, res)
)

export default router

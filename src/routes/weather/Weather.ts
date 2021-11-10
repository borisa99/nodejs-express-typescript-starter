import { Request, Response } from 'express'
import { router } from '../../server_setup'
import { weatherController } from '../../controllers'

router.get('/', (req: Request, res: Response) => {
  weatherController.get(req, res)
})

export default router

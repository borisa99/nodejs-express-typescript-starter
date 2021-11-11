// import { Request, Response } from 'express'
import { router } from '../../server_setup'
import { weatherController } from '../../controllers'

router.get('/', weatherController.get)
router.get('/:id', weatherController.get)
router.get('/all/test', weatherController.get)

router.post('/:id/test', weatherController.get)

export default router.getInstance()

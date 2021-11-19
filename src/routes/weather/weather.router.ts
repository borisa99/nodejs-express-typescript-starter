import { router } from '@/router_wrapper'
import { weatherController } from '@/controllers'

router.get('/', weatherController.get)

export default router.getInstance()

import { router } from '@/server_setup'
import { weatherController } from '@/controllers'

router.get('/', weatherController.get)

export default router.getInstance()

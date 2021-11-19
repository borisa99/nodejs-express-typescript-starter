import { userController } from '@/controllers'
import { router } from '@/router_wrapper'

router.get('/me', userController.me)

export default router.getInstance()

import { userController } from '@/controllers'
import { router } from '@/server_setup'

router.get('/me', userController.me)

export default router.getInstance()

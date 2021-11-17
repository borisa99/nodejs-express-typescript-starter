import { router } from '@/server_setup'
import { authController } from '@/controllers'

router.get('/register', authController.register)

export default router.getInstance()

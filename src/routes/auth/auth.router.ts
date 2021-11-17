import { router } from '@/server_setup'
import { authController } from '@/controllers'

router.post('/register', authController.register)

export default router.getInstance()

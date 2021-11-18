import { router } from '@/server_setup'
import { authController } from '@/controllers'

router.post('/register', authController.register)
router.get('/activate', authController.activate)
router.post('/login', authController.login)

export default router.getInstance()

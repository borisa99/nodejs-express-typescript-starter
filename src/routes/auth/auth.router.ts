import { router } from '@/server_setup'
import { authController } from '@/controllers'

router.post('/register', authController.register)
router.get('/activate', authController.activate)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)

export default router.getInstance()

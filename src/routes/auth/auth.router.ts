import { router } from '@/server_setup'
import { authController } from '@/controllers'

router.post('/register', authController.register)
router.get('/activate', authController.activate)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/request_reset_password', authController.requestResetPassword)
router.post('/reset_password', authController.resetPassword)

export default router.getInstance()

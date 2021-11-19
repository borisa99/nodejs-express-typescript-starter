// import { userController } from '@/controllers'
import { router } from '@/server_setup'

import { Request, Response } from 'express'

router.get('/me', (req: Request, res: Response) => {
  console.log(req)

  console.log(res.json)
})

export default router.getInstance()

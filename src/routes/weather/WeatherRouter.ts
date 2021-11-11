// import { Request, Response } from 'express'
import { customRouterInstance } from '../../server_setup'
import { weatherController } from '../../controllers'

customRouterInstance.get('/:id', weatherController.get)
customRouterInstance.get('/all/test', weatherController.get)

export default customRouterInstance.getRouter()

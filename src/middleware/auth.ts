import { ServiceResponse } from '@/models/ServiceResponse'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import jwt from 'jsonwebtoken'

const auth = (req: any, res: any, next: any) => {
  const result: ServiceResponse<any> = new ServiceResponse<any>()
  try {
    const token = req.header('token')

    // Check if token exists
    if (!token) {
      result.error = 'No token, authorization denied'
      result.status = 401
    }
    // Check if token is valid
    const decoded = jwt.verify(token, <string>process.env.JWT_SECRET)

    // TODO Check if token is expired

    // Set user to req
    req.user = decoded
  } catch (error: any) {
    result.error = error.message
    result.status = 401
  } finally {
    result.status === 200 ? next() : serviceResponseHandler(res, result)
  }
}
export default auth

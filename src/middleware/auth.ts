import { RoleValue } from '@/models/RoleValue'
import { ServiceResponse } from '@/models/ServiceResponse'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { GetUserPayload } from '@/shared/types/auth/GetUserPayload'
import jwt from 'jsonwebtoken'

const auth = (allowedRoles: RoleValue[] = [], isPublic = false) => {
  return (req: any, res: any, next: any) => {
    const result: ServiceResponse<any> = new ServiceResponse<any>()
    try {
      // Continue if public access is allowed
      if (isPublic) {
        next()
      }

      // Get token from header
      const token = req.header('token')

      // Check if token exists
      if (!token) {
        result.error = 'No token, authorization denied'
        result.status = 401
      }
      // Check if token is valid
      const decoded: GetUserPayload = <GetUserPayload>(
        jwt.verify(token, <string>process.env.JWT_SECRET)
      )

      // Check if user has the right role
      if (
        allowedRoles.length > 0 &&
        !decoded.roles.some(role => allowedRoles.includes(role))
      ) {
        result.error = 'You are not authorized to access this resource'
        result.status = 401
      }
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
}

export default auth

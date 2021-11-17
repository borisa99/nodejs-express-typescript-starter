import { Response } from 'express'
import { ServiceResponse } from '@models/ServiceResponse'

export const serviceResponseHandler = (
  res: Response,
  data: ServiceResponse<any>
) => {
  if (data.status !== 200) {
    return res.status(data.status).send(data)
  }
  return res.send(data)
}

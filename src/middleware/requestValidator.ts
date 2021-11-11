import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'

// parallel processing
export const validate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const keys = Object.keys(req.params)
  let originalUrl = req.originalUrl

  // replace all values from url with keys
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    originalUrl = originalUrl.replace(`/${req.params[key]}`, `/${key}`)
  }

  const baseUrlArray = originalUrl.split('/').splice(1)
  const name = baseUrlArray[1]
  const key =
    baseUrlArray.length > 1
      ? baseUrlArray.splice(1).join('_')
      : req.method.toLocaleLowerCase()

  const path = `../routes/${name}/${name}RouterRules`
  const validations = await require(path)

  await Promise.all(
    validations.default[key].map((validation: ValidationChain) =>
      validation.run(req)
    )
  )

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  res.status(400).json({ errors: errors.array() })
}

import { body } from 'express-validator'

export default {
  get: [
    body('city').notEmpty().isString().withMessage('city must be a string'),
  ],
}

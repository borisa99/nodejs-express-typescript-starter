import { body } from 'express-validator'
export default {
  post_register: [body('email').isEmail().withMessage('Email must be valid')],
}

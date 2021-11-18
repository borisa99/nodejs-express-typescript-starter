import { body, query } from 'express-validator'
export default {
  post_register: [
    body('user.first_name').isString().withMessage('First name must be valid'),
    body('user.last_name').isString().withMessage('Last name must be valid'),
    body('user.email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('user.password')
      .isLength({ min: 8 })
      .withMessage('Password must be minimum 8 characters long'),
    body('user.roles')
      .isArray()
      .withMessage('Roles must be valid array of available roles'),
  ],
  get_activate: [
    query('ticket')
      .notEmpty()
      .withMessage('Ticket query parameter is required'),
  ],
  post_login: [
    body('email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('password')
      .notEmpty()
      .isString()
      .withMessage('Password must be valid'),
  ],
}

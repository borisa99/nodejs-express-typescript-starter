import { body } from 'express-validator'

export default {
  get: [],
  get_id: [body('city').not().isEmpty()],
  post_id_test: [body('city').not().isEmpty()],
}

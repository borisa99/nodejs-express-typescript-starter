import { body } from 'express-validator'

export default {
  weather_id: [body('city').not().isEmpty()],
  weather_all_test: [],
}

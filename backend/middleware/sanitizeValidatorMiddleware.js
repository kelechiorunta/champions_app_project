import { body, validationResult } from 'express-validator';

// Login sanitized schema
export const loginSchema = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').trim().isLength({ min: 6 }, 'Minimum 6 characters')
];

// Signup sanitized schema
export const signupSchema = [
  body('username', 'Username must be alphabets')
    .matches(/^[A-Za-z]{3,20}$/)
    .isLength({ min: 3, max: 20 }),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').trim().isLength({ min: 6 }, 'Minimum 6 characters')
];

const sanitizeValidator = (schema) => [
  //   Sanitize inputs from req.body
  schema,

  //  Validate requests
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Send the error to the client form again with sanitized values/error messages.
      return res.status(400).json({ error: errors.array() });
    }
    next();
  }
];

export default sanitizeValidator;

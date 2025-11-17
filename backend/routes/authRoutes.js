import express from 'express';
import passport from 'passport';
import { configureGooglePassport, configureLocalPassport } from '../config/passportStrategy.js';
import {
  signupController,
  passportLogin,
  isAuthenticated,
  logoutController
} from '../controllers/authControllers.js';
import { isauthenticated } from '../middleware/isAuthenticatedMiddleware.js';

const authRouter = express.Router();

configureLocalPassport(passport);

authRouter.get('/logout', logoutController);
authRouter.post('/signin', passportLogin);
authRouter.post('/signup', signupController);
authRouter.get('/isAuthenticated', isauthenticated, isAuthenticated);

export default authRouter;

import express from 'express';
import passport from 'passport';
import { configureGooglePassport, configureLocalPassport } from '../config/passportStrategy.js';
import {
  signupController,
  passportLogin,
  isAuthenticated,
  logoutController,
  passportSignup,
  passportRedirect
} from '../controllers/authControllers.js';
import { isauthenticated } from '../middleware/isAuthenticatedMiddleware.js';

const authRouter = express.Router();

configureLocalPassport(passport);
configureGooglePassport(passport);

authRouter.get('/logout', logoutController);
authRouter.post('/signin', passportLogin);
authRouter.post('/signup', passportSignup);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/oauth2/redirect/google', passport.authenticate('google'), passportRedirect);

authRouter.get('/isAuthenticated', isauthenticated, isAuthenticated);

export default authRouter;

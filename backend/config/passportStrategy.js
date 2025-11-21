import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';

import User from '../models/User.js';

dotenv.config();

export const configureLocalPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'No client found!' });
          }

          const isValid = await user.comparePassword(password);
          if (!isValid) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user);
        } catch (err) {
          console.error('Local sign-in failed', err.message);
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (err) {
      console.log('LOGIN ERROR', err);
      done(err);
    }
  });
};

export const configureGooglePassport = (passport) => {
  // 🔹 Register Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CHAMPIONS_CLIENT_ID,
        clientSecret: process.env.CHAMPIONS_CLIENT_SECRET,
        callbackURL: 'http://localhost:5174/proxy/auth/oauth2/redirect/google',
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ username: profile.displayName });

        const newUser = {
          username: currentUser
            ? profile.displayName +
              profile.displayName[profile.displayName.length - 1] +
              // profile.emails[0].value[0] +
              profile.emails[0].value[profile.emails[0].value.length - 1]
            : profile.displayName,
          email: profile.emails[0].value,
          'google.name': profile.displayName, // Use displayName for the name
          'google.email': profile.emails[0].value, // Use emails[0].value for email
          'google.accessToken': accessToken, // ✅ save token
          active: true
        };
        const googleUser = await User.findOne({ 'google.email': profile.emails[0].value });
        const localUser = await User.findOne({ email: profile.emails[0].value });

        try {
          if (googleUser && localUser) {
            return done(null, googleUser);
          } else if (googleUser) {
            return done(null, googleUser);
          } else if (localUser) {
            localUser.google = {
              email: profile.emails[0].value,
              displayName: profile.displayName,
              accessToken
            };
            await localUser.save();
            console.log('Local user updated with Google info');
            done(null, localUser);
          } else {
            //User is new
            const user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error('Google authentication error:', err.message);
          done(err, null);
        }
      }
    )
  );

  // 🔹 Serialize user into the session
  passport.serializeUser((user, done) => {
    console.log('🗄️ SERIALIZE user:', user);
    done(null, user);
  });

  // 🔹 Deserialize user out of the session
  passport.deserializeUser(async (account, done) => {
    console.log('🗄️ DESERIALIZE user id:', account);
    try {
      // Lookup user in DB if needed
      const user = account;
      done(null, user);
    } catch (err) {
      console.error('❌ Deserialize error:', err);
      done(err, null);
    }
  });
};

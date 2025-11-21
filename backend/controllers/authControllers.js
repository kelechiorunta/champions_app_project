import passport from 'passport';
import crypto from 'node:crypto';
import User from '../models/User.js';

const signupController = async (req, res) => {
  console.log(req.body);
};

const passportSignup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const newUser = new User({ username: username, password: password, email: email });
    await newUser.save();

    // Optionally log them in immediately with passport req object:
    req.login(newUser, (err) => {
      if (err) return res.status(500).json({ error: 'Auto-login failed after signup' });
      return res.status(201).json({ message: 'Signup successful', user: newUser });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error during signup' });
  }
};

const passportLogin = (req, res, next) => {
  passport.authenticate(
    'local',
    { failureRedirect: '/login', failureMessage: 'true' },
    async (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ error: info?.message || 'Unauthorized' });
      }

      req.logIn(user, async (err) => {
        if (err) return res.status(500).json({ error: err || 'Login error' });

        // If user checked "remember me"
        if (req.body.rememberMe) {
          const token = crypto.randomBytes(32).toString('hex');
          await User.findByIdAndUpdate(user._id, { rememberMeToken: token });

          res.cookie('remember_me', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
            sameSite: 'lax'
          });
        }
        req.session.user = user;
        req.session.authenticated = true;
        return res.json({ message: 'Login successful', user: user });
      });
    }
  )(req, res, next);
};

export const passportRedirect = (req, res, next) => {
  try {
    req.session.user = req.user;
    req.session.authenticated = req.isAuthenticated();
    // res.json({ message: 'Login successful', user: req.user, isValid: req.isAuthenticated() });
    res.redirect('/');
  } catch (err) {
    res.redirect('/login');
  }
};

const logoutController = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie('remember_me');
    res.redirect('/login');
  });
};

const isAuthenticated = (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'No authenticated user!' });
  }
};

export const rememberMeLogin = async (req, res, next) => {
  if (req.isAuthenticated()) return next();

  const token = req.cookies.remember_me;
  if (!token) return next();

  const user = await User.findOne({ rememberMeToken: token });
  if (!user) return next();

  req.logIn(user, (err) => {
    if (err) return next();
    next();
  });
};

export { signupController, passportLogin, passportSignup, isAuthenticated, logoutController };

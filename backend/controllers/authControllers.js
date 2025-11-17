import passport from 'passport';

const signupController = async (req, res) => {
  console.log(req.body);
};

const passportLogin = (req, res, next) => {
  passport.authenticate(
    'local',
    { failureRedirect: '/login', failureMessage: 'true' },
    (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ error: info?.message || 'Unauthorized' });
      }

      req.logIn(user, (err) => {
        if (err) return res.status(500).json({ error: err || 'Login error' });

        req.session.user = user;
        req.session.authenticated = true;
        return res.json({ message: 'Login successful', user: user });
      });
    }
  )(req, res, next);
};

const logoutController = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
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

export { signupController, passportLogin, isAuthenticated, logoutController };

import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import ConnectMongoDBSession from 'connect-mongodb-session';
import cors from 'cors';

import { connectDB } from './db/db.js';
import authRouter from './routes/authRoutes.js';
import passport from 'passport';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 5333 || process.env.PORT;

// Session store configuration
const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore(
  {
    uri: process.env.MONGO_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7
  } // Sessions expire after 1 week}
);

const sessionOptions = {
  name: 'user_session',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  },
  store: store
};

// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
const ALLOWED_ORIGINS = ['http://localhost:5174'];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(false, new Error('Domain not supported'));
    }
  },
  method: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
};

// Log server requests
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
}
// Add cookie parser middleware to handle and parse session cookies
app.use(cookieParser());

// Add express session middleware for storing sessions
app.use(session(sessionOptions));

// Middleware for json and multipart form handling
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize passport middleware, strategy and session
app.use(passport.initialize());
app.use(passport.session());

// Mount all auth routes here
app.use('/proxy/auth', authRouter);

app.get('/proxy', (req, res) => {
  res.json({ message: 'Hello World' });
});

if (process.env.NODE_ENV === 'development') {
  // Error-handler middleware for handling errors in DEV mode
  app.use((err, req, res, next) => {
    console.error('Something went wrong', err);
    next(err);
  });
}

const httpServer = createServer(app);

connectDB(process.env.MONGO_URI)
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Server listens at PORT ${PORT}`));
  })
  .catch((err) => console.error('Database failed to connect', err));

import * as session from 'express-session';

export function configureSession() {
  return session({
    // A secret key used to sign the session ID cookie
    secret: 'some secret here',

    // Prevents resaving a session that hasn't been modified during the request
    resave: false, // Don't save session if unmodified

    // Prevents storing an uninitialized session (one that hasn't been modified or populated)
    saveUninitialized: false, // Don't create session until something stored

    cookie: {
      // Ensures the cookie is only accessible via HTTP(S), not by client-side scripts
      httpOnly: true,

      // When true, ensures the cookie is only sent over HTTPS (enabled in production)
      secure: process.env.NODE_ENV === 'production', // Enable secure cookie in production environment

      // Sets the cookie domain based on the environment, defaulting to 'localhost' if no frontend URL is provided
      domain: process.env.FRONT_END_URL
        ? process.env.FRONT_END_URL
        : 'localhost',
    },
  });
}

import { ORIGINS } from '@Constants/variables/origins';

export const Cors = {
  // Handle the origin validation for CORS requests
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || ORIGINS.includes(origin)) {
      // Allow if the origin is in the ORIGINS array or if there's no origin (e.g., server-to-server calls)
      callback(null, true);
    } else {
      // You can adjust the response here to block non-allowed origins
      callback(new Error('Not allowed by CORS')); // Change this to block origins not in the list
    }
  },

  // Allow credentials (cookies, authorization headers, etc.) to be passed during requests
  credentials: true,

  // Expose certain headers that can be accessed by the client
  exposedHeaders: ['Content-Disposition'], // Used typically for file download responses

  // Allowed HTTP methods for the CORS requests
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  // Don't continue processing preflight requests (OPTIONS method)
  preflightContinue: false,

  // HTTP status code to return for successful OPTIONS requests
  optionsSuccessStatus: 204,
};

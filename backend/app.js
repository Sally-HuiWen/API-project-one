const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


//Create a variable called isProduction that will be true if the environment is in production 
//or not by checking the environment key in the configuration file (backend/config/index.js):
const { environment } = require('./config');//.config/index.js
const isProduction = environment === 'production';//isProduction is true or false

//Initialize the Express application
const app = express();
//Connect the morgan middleware for logging information about requests and responses
app.use(morgan('dev'));
//Add the cookie-parser middleware for parsing cookies 
app.use(cookieParser());
//Add the express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json".
app.use(express.json());

// Security Middleware
//CORS isn't needed in production since all of our React and Express resources will come from the same origin.
//cors({ origin: '*' }) allows cross-origin requests 
if (!isProduction) {
    // enable cors only in development
    app.use(cors());//this name as app.use(cors({ origin: '*' }));
    //my note:This is useful during development to allow the application to interact with services or APIs from different origins, facilitating tasks like front-end and back-end development running on different servers or ports.
}

// helmet helps set a variety of headers to better secure your app
//here sets the Cross-Origin-Resource-Policy (CORP) header with a policy of "cross-origin"
//"cross-origin" Policy:  This policy allows resources to be requested by any origin as long as the requests are made without credentials (like cookies or HTTP authentication).
//CORP does not override or bypass CORS headers or same-origin policies.It sets up the CORP header to allow the resources from your server to be requested from different origins, as long as such requests are also allowed by other security policies like CORS
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
  
// Set the _csrf token and create req.csrfToken method
//This csurf middleware will add a _csrf cookie that is HTTP-only 
//It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later in backend/routes/index.js
//The XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET. 
//This header will be used to validate the _csrf cookie to confirm that the request comes from your site and not an unauthorized site.
//After user login successfully, user making requests, browser create csrf token and send it in _csrf cookie automatically; frontend developer will read decrypted XSRF-TOKEN cookie and place it in the request headers;backend read both and see if matches;
//csurf token only focus on protecting none-get requests
app.use(
  csurf({
    cookie: {//tell csrf to store _csrf token in a cookie; this is a encrypted cookie; when user making requests, browser send this cookie automatically
      secure: isProduction,//production :HTTPS; development: HTTP is OK
      sameSite: isProduction && "Lax",//production:will send cookies for cross-site GET requests;development: cookies will be for all requests regardless of same or cross sites
      httpOnly: true//cookie is not accessible to client-sie Javascript to protect against XSS attack
    }
  })
);

const routes = require('./routes');
app.use(routes); // Connect all the routes

//Sequelize Error-Handler phase2/part2
const { ValidationError } = require('sequelize');

// const path = require('path');
// app.use('/images', express.static(path.join(__dirname, '..', 'images')));


// Phase 2/part1: Catch unhandled requests, create an error 'Resource Not Found', and forward to error handler.
//This is a regular middleware to create an error!
//It will catch any requests that don't match any of the routes defined and create a server error with a status code of 404.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Phase 2/part2:  
//an error handler middleware to catch Sequelize errors and formatting them before sending the error response
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {//err.errors refers to an array of error objects that Sequelize includes when it throws a ValidationError
      errors[error.path] = error.message;//err.path refers to the attribute or field name of the model that is associated with the error.
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});


// Phase 2/part3: Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,//my note: err.error is  a property of the Error object that is manually assigned to provide additional details about the error
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;
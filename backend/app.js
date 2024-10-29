// Import the express module
const express = require("express");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Import the sanitizer module
const sanitize = require("sanitize");
//// Import the CORS module
const cors = require("cors");
// Set up the CORS options to allow requests from our front-end
// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200
// };
// Create a variable to hold our port number
const port = process.env.PORT;
// Import the router
const router = require("./routes/index");
// Create the webserver
const app = express();
app.use(cors());
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);

// Add the routes to the application as middleware
app.use(router);

// My addition Start
//  To check successful backend deployed start here*********
app.get("/", (req, res) => {
  res.status(200).json({
    Message: "Successfully backend deployed!",
  });
}); 
// My addition End
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// //generate a random string for hashed password 
// const bcrypt = require("bcrypt");

// const password = "123456";
// const saltRounds = 10;

// bcrypt.hash(password, saltRounds, function (err, hash) {
//   if (err) throw err;
//   console.log("Hashed Password:", hash);
// });

// const crypto = require("crypto");

// function generateRandomString(length = 32) {
//   return crypto.randomBytes(length).toString("hex").slice(0, length);
// }

// // Example usage
// console.log(generateRandomString());


import * as dotenv from 'dotenv' 
dotenv.config()
import express from "express"
import bodyParser from "body-parser";
import  jwt from "jsonwebtoken";
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser";
import WooCommerceAPI from 'woocommerce-api';
import axios from "axios";
import querystring from 'query-string';

const app = express();
const SECRET_KEY = 'your-secret-key';

// Setup body-parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Define a login route that generates an access token for the authenticated user
app.use("/api/auth",authRouter);

// Define a middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // Check if the user has a valid access token
  const accessToken = req.cookies.access_token
  if (!accessToken) {
    return res.status(401).send('Access token not found');
  }
  // Verify the access token using the secret key
  jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid access token');
    }
    // Store the decoded token in the request object for later use
    req.user = decoded;
    next();
  });
};

// Define a protected route that requires authentication
app.get('/api/protected', isAuthenticated, (req, res) => {
  // If the user is authenticated, send the protected data as response
  res.json({ data: 'This is a protected API.', user: req.user });
});

// Define a public route that doesn't require authentication
app.get('/api/public', (req, res) => {
  // Send the public data as response
  res.json({ data: 'This is a public API.' });
});

app.get('/return-page',(req,res)=>{
  res.send("Its working")
})
app.get('/callback-endpoint', (req, res) => {
  const {consumer_key, consumer_secret} = req.query;
  console.log('Consumer Key:', consumer_key);
  console.log('Consumer Secret:', consumer_secret);

  // You can also send a response back to the client
  res.send('Authentication successful');
});

app.listen(9000, () => console.log('Server started on port 9000'));

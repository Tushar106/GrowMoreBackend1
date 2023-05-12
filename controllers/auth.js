
import jwt from "jsonwebtoken"
const SECRET_KEY = 'your-secret-key';
export const login= (req, res) => {
        // TODO: Check if the user credentials are valid
        const username = req.body.username;
        const password = req.body.password;
        if (username !== 'myusername' || password !== 'mypassword') {
          return res.status(401).send('Invalid username or password');
        }
        // Generate an access token using the secret key
        const accessToken = jwt.sign({ username: username }, SECRET_KEY);
        // res.json({ accessToken: accessToken });
        res.cookie("access_token",accessToken,{
            httpOnly:true
        })
        .status(200).json("Access Token Granted");
      }
// Import the jwt library for working with JSON Web Tokens
import jwt from "jsonwebtoken";

// Define a function named generateTokenAndSetCookie which takes userId and response object (res) as parameters
const generateTokenAndSetCookie = (userId, res) => {
  // Generate a JWT token with the provided userId and JWT_SECRET, set to expire in 15 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set a cookie named "jwt" in the response object with the generated token
  res.cookie("jwt", token, {
    // Set the maximum age of the cookie to 15 days
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // Restrict access to the cookie to HTTP requests only (not accessible by client-side scripts)
    httpOnly: true,
    // Restrict when the cookie is sent to the server in cross-site requests
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // false only in development env
  });
};

// Export the generateTokenAndSetCookie function as the default export of this module
export default generateTokenAndSetCookie;

// This function generates a JWT token for the given userId and sets it as a cookie in the response.

/*
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library. Used for securely transmitting information between parties as a JSON object.

const generateTokenAndSetCookie = (userId, res) => {
  // Function to generate a JWT and set it as a cookie

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Create a JWT with userId payload, signed with a secret key
    expiresIn: "15d", // Token expires in 15 days
  });

  res.cookie("jwt", token, {
    // Set the JWT as a cookie
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
    httpOnly: true, // Cookie not accessible via JavaScript
    sameSite: "strict", // Cookie only sent for same-site requests
  });
};

export default generateTokenAndSetCookie; // Export the function
*/

/*
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for creating and verifying JWTs. This library allows us to generate JSON Web Tokens (JWT), which are used for securely transmitting information between parties as a JSON object.

const generateTokenAndSetCookie = (userId, res) => {
  // Define a function named generateTokenAndSetCookie that takes two parameters: userId and res (the response object).

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Create a JWT with the userId as its payload. The jwt.sign method generates a signed token.
    // { userId } is the payload, which is the data we want to include in the token.
    // process.env.JWT_SECRET is the secret key used to sign the token. This key should be stored securely as an environment variable.
    // { expiresIn: "15d" } sets the expiration time for the token to 15 days. After this period, the token will no longer be valid.
    expiresIn: "15d", // Specifies the token's expiration time.
  });

  res.cookie("jwt", token, {
    // Set the generated JWT as a cookie in the HTTP response.
    maxAge: 15 * 24 * 60 * 60 * 1000, // Set the cookie's expiration time to 15 days, converted to milliseconds (15 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second).
    httpOnly: true, // Set the HttpOnly flag to prevent the cookie from being accessed via client-side JavaScript. This helps protect against cross-site scripting (XSS) attacks.
    sameSite: "strict", // Set the SameSite attribute to "strict" to prevent the cookie from being sent with cross-site requests. This helps mitigate cross-site request forgery (CSRF) attacks.
  });
};

export default generateTokenAndSetCookie; // Export the generateTokenAndSetCookie function as the default export from this module. This allows the function to be imported and used in other parts of the application.
*/

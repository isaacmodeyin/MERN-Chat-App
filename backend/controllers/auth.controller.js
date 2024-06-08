import bcrypt from "bcryptjs"; // Import bcrypt library for password hashing
import User from "../models/user.model.js"; // Import the User model
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Controller function for user signup
export const signup = async (req, res) => {
  try {
    // Destructure properties from the request body
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if the passwords did not match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if the username already exists in the database
    const user = await User.findOne({ username });

    // If user already exists, send a 400 Bad Request response
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Define URLs for profile pictures based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new User instance with the provided data
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT ttoken here
      generateTokenAndSetCookie(newUser._id, res);
      // Save the new user to the database
      await newUser.save();

      // Send a success response with the new user's details
      res.status(201).json({
        _id: newUser._id, // User ID
        fullName: newUser.fullName, // Full name of the user
        username: newUser.username, // Username of the user
        profilePic: newUser.profilePic, // Profile picture URL
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // Log the error message for debugging
    console.log("Error in signup controller:", error.message);

    // Send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Placeholder controller function for user login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // Log the error message for debugging
    console.log("Error in login controller:", error.message);
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Placeholder controller function for user logout
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


/*
export const logout = (req, res) => {
  try {
    // Clears the JWT cookie: setting the cookie value to an empty string and maxAge: 0 makes the cookie expire immediately, prompting the browser to delete it.
    res.cookie("jwt", "", { maxAge: 0 });
    // Send success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/
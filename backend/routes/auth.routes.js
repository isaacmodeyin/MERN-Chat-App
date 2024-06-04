import express from "express"; // Import Express to create a router
import { login, logout, signup } from "../controllers/auth.controller.js"; // Import authentication controllers

const router = express.Router(); // Create a new router instance

// Define routes for authentication
router.post("/signup", signup); // Handle POST requests to /api/auth/signup
router.post("/login", login);   // Handle POST requests to /api/auth/login
router.post("/logout", logout); // Handle POST requests to /api/auth/logout

export default router; // Export the router

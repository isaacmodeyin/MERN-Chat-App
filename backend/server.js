import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDB.js";

import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server running on port ${PORT}`);
});

/*

import express from "express"; // Import Express to create and manage the web server
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"; // Import authentication routes
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js"; // Import a function to connect to MongoDB

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Define the port number, using the PORT environment variable if available, or default to 5000

dotenv.config(); // Load environment variables from a .env file into process.env

app.use(express.json()); // Use middleware to parse incoming JSON request bodies (from req.body)
app.use(cookieParser());  // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes); // Mount the authRoutes middleware to handle requests starting with /api/auth
app.use("/api/messages", messageRoutes);

// Define a route to handle GET requests to the root URL ("/")
app.get("/", (req, res) => {
  // Send a plain text response to the client
  res.send("Hello world!!");
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDb(); // Call the function to connect to MongoDB
  console.log(`Server running on port ${PORT}`); // Log a message indicating the server is running
});

*/

import mongoose from "mongoose";
import User from "../src/models/User.js";
import Task from "../src/models/Task.js";

// Clean up database after each test suite
afterAll(async () => {
  try {
    // Clean up collections
    await User.deleteMany({});
    await Task.deleteMany({});
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error("Cleanup error:", error);
  }
});

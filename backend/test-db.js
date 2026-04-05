const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const User = require("./src/models/User");

async function checkUser() {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: 'analyst2@test.com' });
    console.log("Database user object:", user);
    console.log("Role property:", user.role);
    process.exit(0);
}
checkUser();

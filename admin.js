// scripts/createadmin.js
const mongoose = require("mongoose");
const Student = require("./models/student"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/techteam") // अपनी DB का नाम डालें
  .then(async () => {
    const existing = await Student.findOne({ username: "DDU0012400009" });
    if (existing) {
      console.log("⚠️ Admin already exists");
      return mongoose.connection.close();
    }

    const admin = new Student({
      name: "Sandeep Singh",
      username: "DDU0012400009",
      email: "sandeepsinghunique@gmail.com",
      rollNumber: "2514010010034",
      semester: "5th",
      roles: ["admin"]
    });

    await Student.register(admin, "Raj@9161"); // hashed password
    console.log("✅ Admin created successfully.");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    mongoose.connection.close();
  });

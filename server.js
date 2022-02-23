const connectDB = require("./config/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const path = require("path");

// implementing cors
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
//     return res.status(200).json({});
//   }
//   next();
// });

// Connect database
connectDB();

// Init bodyParser middleware
app.use(express.json({ extended: false })); // This is equal to use(bodyParser.json())

// Define routes
app.use("/api/login", require("./routes/api/login"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/signup", require("./routes/api/signup"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Its running on ${PORT} dont worry`);
});

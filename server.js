const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 8000;
const path = require("path");
const secret = process.env.SECRET;
const cors = require("cors");

// Middlewares for every request
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build"))); 

// DB connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/quote-keeper",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to the DB")
);

// Routes
app.use("/auth", require("./routes/authRouter.js"));

// Creates a 'security-gate' for any request going to /api/anything else
// Decode given token, and create a req.user
app.use("/api", expressJwt({ secret: secret, algorithms: ["HS256"] })); // req.user._id
app.use("/api/quote", require("./routes/quoteRouter.js"));

// Global server err handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

// Server Setup
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

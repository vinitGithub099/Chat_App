const cors = require("cors");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
require("dotenv").config();
const connectDB = require("./db");
connectDB();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const express = require('express');
const app = express();
require('dotenv').config();

app.get("/", (req, res) => {
  res.json({message: "Welcome to the API! 🥳🎉"})
})

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`The server was started! http://localhost:${PORT}`)
);

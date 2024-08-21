const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");

// CORS options
const corsOptions = {
  origin: [
    // "http://localhost:3000",
    "http://go-food-frontend-seven.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};

app.use(cors(corsOptions));

mongoDB();
app.use(express.json());

// Use routes without '/api' prefix
app.use(require("./Routes/CreateUser"));
app.use(require("./Routes/DisplayData"));
app.use(require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

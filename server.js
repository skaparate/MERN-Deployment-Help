const express = require("express");
const cors = require("cors");
const path = require("path");

const connectToDatabase = require("./db/connectToDatabase");

const app = express();
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
app.use("/vote", require("./routes/vote"));
app.use("/get-votes", require("./routes/get-votes"));
app.use("/create-teacher", require("./routes/create-teacher"));
app.use("/get-all-teachers", require("./routes/get-all-teachers"));

// Step 3
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

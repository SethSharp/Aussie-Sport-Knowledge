const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors");
const exp = require("constants");
const { CONSOLE_APPENDER } = require("karma/lib/constants");

const app = express();
let port = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/aussieUsers", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {console.log("DB connected")});

// User info
let UserSchema = {
  name: String,
  password: String,
  correct: { type: Number, default: 5 },
  incorrect: { type: Number, default: 6 },
  score: { type: Number, default: 10 },
  totalCorrect: { type: Number, default: 5 },
  answerStreak: { type: Number, default: 2 },
  bestAnswerStreak: { type: Number, default: 3 },
  sports: { type: Object, default: { NRL: [10, 0], AFL: [7, 2], CRI: [4, 5] } },
};
const User = mongoose.model("User", UserSchema);

//
app.get("/userExists/:id", (req, res) => {
  User.findOne({ name: req.params.id, password: "123"}).then((user) => {
    res.json(user);
  });
});

app.post("/createUser", (req, res) => {
  user = new User(req.body);
  user.save().then(() => {
    res.json(user);
  });
});


app.listen(port, () => {
  console.log("listening on port: ", port);
})

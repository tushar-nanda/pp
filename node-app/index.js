// server.js
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const Users = mongoose.model('Users', { username: String, password: String });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = new Users({ username, password });
  user.save()
    .then(() => {
      res.send({ message: "Saved user" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  Users.findOne({ username:username })
    .then(user => {
      if (!user) {
        res.send({ message: "User not found" });
      } else {
        res.send({ message: "User found" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

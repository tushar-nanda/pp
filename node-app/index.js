// server.js
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


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
const Products = mongoose.model('Products', {pname:String  , pdesc: String , price : String , category : String , pimage : String });

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

  const username = req.body.username;
  const password = req.body.password;
  
  Users.findOne({ username:username })
    .then(result => {
      console.log(result , "user data");
      if (!result) {
        res.send({ message: "User not found" });
      } else {
        if(result.password == password)
        {
          const token = jwt.sign({
            data: result
          }, 'MYKEY', { expiresIn: '1h'});
          
          res.send({ message: "User found with correct password" , token:token });
        }
      if(result.password != password) {
          res.send({ message: "User found without password" });

        }
      } 
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
});

app.post('/add-product',upload.single('pimage') ,  (req, res) => {
  console.log(req.body); 
  console.log(req.file); 

  return ;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

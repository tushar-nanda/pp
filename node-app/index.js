// server.js
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

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

app.use('/uploads' , express.static(path.join(__dirname , 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search',productController.search);

app.post('/like-product' , userController.likeProducts );
app.post('/dislike-product' , userController.dislikeProducts );

app.post('/signup', userController.signup);

app.post('/login',userController.login);

app.get('/get-products/' ,productController.getProducts);

app.get('/get-product/:pId' , productController.getProductsById);

app.post('/liked-products' , userController.likedProducts);

app.get('/my-profile/:userId' ,userController.myProfileById);

app.post('/my-products' ,productController.myProducts);

app.get('/get-user/:uId' ,userController.getUserById);

app.post('/add-product',upload.fields([{name:'pimage'  } , {name:'pimage2'}]) , productController.addProduct );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

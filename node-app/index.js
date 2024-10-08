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
require('dotenv').config();
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

const { Server } = require("socket.io");
const http = require('http');
// const { Socket } = require('dgram');
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
      origin:'*'
    }
});

app.use(express.static('images'));


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

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

mongoose.connect(process.env.MONGOURL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGOURL);
//     console.log('MongoDB connected');
//   } catch(err){
//     console.log('MongoDB connection error:', err)
//   }
// }



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search',productController.search);

app.post('/like-product' , userController.likeProducts );
app.post('/dislike-product' , userController.dislikeProducts );

app.post('/signup', userController.signup);

app.post('/login',userController.login);

app.post('/delete-product',productController.deleteProduct);

app.get('/get-products/' ,productController.getProducts);

app.get('/get-product/:pId' , productController.getProductsById);

app.post('/liked-products' , userController.likedProducts);

app.get('/my-profile/:userId' ,userController.myProfileById);

app.post('/my-products' ,productController.myProducts);

app.get('/get-user/:uId' ,userController.getUserById);

app.post('/add-product',upload.fields([{name:'pimage'  } , {name:'pimage2'}]) , productController.addProduct );
app.post('/edit-product',upload.fields([{name:'pimage'  } , {name:'pimage2'}]) , productController.editProduct );


let message = [];
io.on('connection' , (socket)=>{
  console.log('scoekt connected ' , socket.id)

  socket.on('sendMsg',(data)=>{
    message.push(data);
    io.emit('getMsg' , message)
  
  })

  io.emit('getMsg' , message)
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

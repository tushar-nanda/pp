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

const Users = mongoose.model('Users', { username: String, password: String  , likedProducts:[{type:mongoose.Schema.Types.ObjectId , ref:'Products'}]});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search', (req, res) => {
  const search = req.query.search; // Access query parameter correctly\
  console.log(search);
  
  Products.find({
    $or:[
      { pname: { $regex: new RegExp(search, 'i') } },
      { pdesc: { $regex: new RegExp(search, 'i') } },
      { price: { $regex: new RegExp(search, 'i') } },
      { category: { $regex: new RegExp(search, 'i') } }
      // { pname :{$regex : search}},   // video wala comment kar diya hai and maine CGP wla likh diya for case insentive
      // { pdesc : {$regex : search}},
      // { price : {$regex : search}},
      // { category :{$regex : search}}
    ]
  })
  .then((results)=>{
    res.send({message:'success' , products:results})
  })
  .catch((err)=>{
    res.send({message:'server error'})
  })




});

app.post('/like-product' ,  (req , res)=>{
 let productId = req.body.productId;
 let userId = req.body.userId;


 Users.updateOne( { _id:userId } , {$addToSet : {likedProducts:productId}} )
 .then(()=>{res.send({messgae:'success liked'})})
 .catch(()=>{res.send({message:'server Error'})})
})

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
        
        res.send({ message: "User found with correct password" , token:token , userId:result._id });
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

app.get('/get-products/' , (req ,res)=>{
    const catName = req.query.catName; 
    let _f = {};

    if(catName)
    {
      _f = {category : catName}
    }
    Products.find(_f)
    .then(result => {
      console.log(result , "user data");
      res.send({message:'success' , products:result });
    })
    .catch(err => {
      console.error(err);
      res.send({messgae:'server error' });
    });
});


app.get('/get-product/:pId' , (req ,res)=>{
    console.log(req.params)
  Products.findOne({ _id : req.params.pId})
  .then(result => {
    res.send({message:'success' , product:result });
  })
  .catch(err => {
    console.error(err);
    res.send({messgae:'server error' });
  });
});

app.post('/liked-products' , (req ,res)=>{
    
  Users.findOne({ _id : req.body.userId }).populate('likedProducts')
  .then(result => {
    // console.log(result , "user data");
    res.send({message:'success' , products:result.likedProducts });
  })
  .catch(err => {
    console.error(err);
    res.send({messgae:'server error' });
  });
});


const Products = mongoose.model('Products', {
  pname:String ,
   pdesc: String ,
    price : String ,
     category : String ,
      pimage : String,
      pimage2 : String,
      addedBy: mongoose.Schema.Types.ObjectId 


});

app.get('/get-user/:uId' , (req ,res)=>{
  const _userId = req.params.uId;
  Users.findOne({_id:_userId})
  .then((result)=>{
      res.send({message:'success' , user:result})
  })
  .catch(err=>{
    console.log({message:'no detil found'})
  })
})

app.post('/add-product',upload.fields([{name:'pimage'  } , {name:'pimage2'}]) ,  (req, res) => {
  console.log(req.files); 
  console.log(req.body); 
  // return ;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage= req.files.pimage[0].path;
    const pimage2= req.files.pimage2[0].path;
    const addedBy= req.body.userId;

  const product = new Products({pname , pdesc , price , category , pimage , pimage2 ,addedBy});

  product.save()
  .then(() => {
    res.send({ message: "Saved user" });
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  });
  return ;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

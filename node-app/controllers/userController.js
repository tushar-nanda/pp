const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
    username: String,
    email: String,
    mobile: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
  });   
module.exports.search = "Sdad";
module.exports.likeProducts = (req , res)=>{
    let productId = req.body.productId;
    let userId = req.body.userId;
   
   
    Users.updateOne( { _id:userId } , {$addToSet : {likedProducts:productId}} )
    .then(()=>{res.send({messgae:'success liked'})})
    .catch(()=>{res.send({message:'server Error'})})
};

module.exports.signup = (req, res) => {
    console.log(req.body);
    const { username, password ,email , mobile } = req.body;
  
    const user = new Users({ username, password ,email , mobile });
    user.save()
    .then(() => {
      res.send({ message: "Saved user" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
};

module.exports.myProfileById = (req ,res)=>{
    
    let uid = req.params.userId;

    Users.findOne({_id:uid})
    .then((result)=>{
        res.send({message:'success' , user:{
          email: result.email,
          mobile: result.mobile, 
          username:result.username,
        }})
    })
    .catch(err=>{
      console.log({message:'no detail found'})
    })
    return ;
};

module.exports.getUserById = (req ,res)=>{
    const _userId = req.params.uId;
    Users.findOne({_id:_userId})
    .then((result)=>{
        res.send({message:'success' , user:{
          email: result.email,
          mobile: result.mobile, 
          username:result.username,
        }})
    })
    .catch(err=>{
      console.log({message:'no detail found'})
    })
};
module.exports.login =  (req, res) => {
  
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
  };

  module.exports.likedProducts = (req ,res)=>{
    
    Users.findOne({ _id : req.body.userId }).populate('likedProducts')
    .then(result => {
      // console.log(result , "user data");
      res.send({message:'success' , products:result.likedProducts });
    })
    .catch(err => {
      console.error(err);
      res.send({messgae:'server error' });
    });
};
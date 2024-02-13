const express = require('express')
const app = express()
const port = 4000
var cors = require('cors') 
app.use(cors())
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const Users = mongoose.model('Users', { username: String , password:String});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/signup' , (req , res)=>{
  // const username = req.body.username;
  // const password = req.body.password;
  const user = new Users({username:"Dasdas" , password :"Dasdvcvxvas" });
  user.save().then(() =>{
    res.send("user saved")
  }).catch(()=>{
    res.send("some eroor occured")
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
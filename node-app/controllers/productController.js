const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    pname:String ,
    pdesc: String ,
    price : String ,
     category : String ,
      pimage : String,
      pimage2 : String,
      addedBy: mongoose.Schema.Types.ObjectId,
      pLoc:{
        type :{
          type : String,
          enum : ['Point'],
          default: 'Point'
        },
        coordinates :{
          type : [Number]
        }
      }
  })
  
  schema.index({pLoc : '2dsphere'});
  
  const Products = mongoose.model('Products',schema );
module.exports.search =  (req, res) => {
    const search = req.query.search; // Access query parameter correctly\
    let latitude = req.query.loc.split(',')[0].trim();
  let longitude = req.query.loc.split(',')[1].trim();
  
  
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
      ],
      pLoc:{
        $near :{
          $geometry :{
            type : 'Point' , 
            coordinates : [parseFloat(latitude),parseFloat(longitude)]
          },
          $maxDistance :500 * 10000 ,
        }
      }
    })
    .then((results)=>{
      res.send({message:'success' , products:results})
    })
    .catch((err)=>{
      res.send({message:'server error'})
    })
};


module.exports.addProduct = (req, res) => {
    console.log(req.files); 
    console.log(req.body); 
    // return ;
    const plat = parseFloat(req.body.plat); 
    const plong = parseFloat(req.body.plong);    // some correction is done here
    //  console.log(plat , plong);
      const pname = req.body.pname;
      const pdesc = req.body.pdesc;
      const price = req.body.price;
      const category = req.body.category;
      const pimage= req.files.pimage[0].path;
      const pimage2= req.files.pimage2[0].path;
      const addedBy= req.body.userId;
      // res.send("sadas");
  
  
      
    const product = new Products({pname , pdesc , price , category , pimage , pimage2 ,addedBy , pLoc :{
      type : 'Point' , coordinates : [plat,plong]
    }
       
    
    });
  
    product.save()
    .then(() => {
      res.send({ message: "Saved user" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
    return ;
  };

  module.exports.editProduct = (req, res) => {
    console.log(req.files); 
    console.log(req.body); 
  
    
      const pid = req.body.pid;
      const pname = req.body.pname;
      const pdesc = req.body.pdesc;
      const price = req.body.price;
      const category = req.body.category;
      let pimage='';
      let pimage2 = '';
      if(req.files && req.files.pimage &&  req.files.pimage.length > 0 )
      {

         pimage= req.files.pimage[0].path;
      }
      if(req.files && req.files.pimage2 &&  req.files.pimage2.length > 0)
      {
         pimage2= req.files.pimage2[0].path;
      }
      const addedBy= req.body.userId;
      // res.send("sadas");
  
  
      
    // const product = new Products({pname , pdesc , price , category , pimage , pimage2 ,addedBy , pLoc :{
    //   type : 'Point' , coordinates : [plat,plong]
    // }
    // });
    let editObj = {};
    if(pname)
    {
      editObj.pname = pname ;
    }
    if(price)
    {
      editObj.price = price ;
    }
    if(category)
    {
      editObj.category = category ;
    }
    if(pimage)
    {
      editObj.pimage = pimage ;
    }
    if(pimage2)
    {
      editObj.pimage2 = pimage2 ;
    }



   Products.updateOne({_id:pid } , editObj , {new :true})
    .then((result) => {
      res.send({ message: "Saved user", product:result });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    });
    return ;
  };

module.exports.getProducts = (req ,res)=>{
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
};

module.exports.getProductsById = (req ,res)=>{
    console.log(req.params)
  Products.findOne({ _id : req.params.pId})
  .then(result => {
    res.send({message:'success' , product:result });
  })
  .catch(err => {
    console.error(err);
    res.send({messgae:'server error' });
  });
};
module.exports.myProducts =  (req ,res)=>{
    const userId = req.body.userId;
  Products.find({addedBy : userId})
  .then(result => {
    // console.log(result , "user data");
    res.send({message:'success' , products:result });
  })
  .catch(err => {
    console.error(err);
    res.send({messgae:'server error' });
  });
};

module.exports.deleteProduct=(req,res)=>{

  Products.findOne({ _id: req.body.pid })
  .then((result)=>{
    
    // res.send({message:'yes it is here' , mm:req.body.pid ,ss: result.addedBy});
    Products.deleteOne({_id : req.body.pid})
      .then((deleteResult)=>{
        console.log(deleteResult);
        res.send({message:'delete ok '});
      })
      .catch(()=>{
        res.send({message:'server Error'});
      })
  })
  .catch(()=>{
    res.send({message:'server Error'});
  })


  // Products.findOne({ _id: req.body.pid })
  // .then((result)=>{
  //   if(result.addedBy == req.body.pid)
  //   {
  //     Products.deleteOne({_id : req.body.pid})
  //     .then((deleteResult)=>{
  //       console.log(deleteResult);
  //       res.send({message:'delete ok '});
  //     })
  //     .catch(()=>{
  //       res.send({message:'server Error'});
  //     })
  //   }
  // })
  // .catch(()=>{
  //   res.send({message:'server Error'});
  // })
}


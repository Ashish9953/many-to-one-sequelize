const express = require("express");
const CustomerModel = require("./models").Customer;
const vehicleModel = require("./models").vehicle;

const app = express();
const PORT = 8087;
app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "welcome to homepage",
  });
});
app.get("/users", (req, res) => {
  CustomerModel.findAll(
   { attributes : { include:['id','CustomerName', 'phoneNo']
        },   
       include:{
             model:vehicleModel,
             attributes:['vehicleName', 'description'],
             required:true
            
             } 
      }).then((data) => {
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "there is some error!!"+err,
      });
    });
});
app.get("/vehicles", (req, res) => {
  vehicleModel.findAll({
    attributes: { exclude: ['CustomerId']
  },
     include:{
       model: CustomerModel ,
       attributes:['CustomerName', 'phoneNo'],
       right:true
   }
  }).then((data) => {
      console.log(data);
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "there is some error!!"+err
      });
    });
});
app.listen(PORT, () => {
  console.log("Application is listening at :" + PORT);
});

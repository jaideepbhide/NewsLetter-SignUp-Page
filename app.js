//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");

});
app.post("/", function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members:[{
              email_address: email,
              status:"subscribed",
              merge_fields:{
                FNAME:firstName,
                LNAME:lastName
              }
            }
          ]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/816ce2a796",
    method: "POST",
    headers:{
      "Authorization":"jaideep1 257860004369ec827f4fd638a4e064d7"
    },
    body: jsonData

  };
  request(options,function(error,response,body){
    if(error){
      res.send(__dirname + "/failure.html");
    }else if( response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.send(__dirname + "/failure.html");
    }
  });

});

app.post("/failure",function(req,res){
  res.redirect("/");

});

app.listen(process.env.PORT|| 3000,function(){
  console.log("Server is Runnning");
});

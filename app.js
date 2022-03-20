
require('dotenv').config(); //from the dotenv npm webiste it help us to make the level 3 secuirty 
//you must keep it to top otherwise if you are using 
//and it is not configured then you cannot able to use .

const express=require("express"); //this is coming from the expresss webiste you can visit there and know what is this 

const bodyParser=require("body-parser"); //it helps use to take the vaiable by their name and store 

const res = require("express/lib/response");
const app=express(); //use with the express when you aare using 
app.use(express.static("public"));
var encrypt = require('mongoose-encryption');//it for the level 2 secruity 
app.use(bodyParser.urlencoded({extended:true}))  //it must be used with the body parser 

app.set('view engine', 'ejs');     // go the the ejs webiste and you will know what is the application of this 
//it helps us to load diferrent things from the same code we need not to write same code everywhere it just drastically cut the 
//alot of the code.
const mongoose = require('mongoose'); // Mongoose is a cross-platform embedded web server and
// networking library. The small footprint of the software enables 
//any Internet-connected device to function as a web server.
mongoose.connect('mongodb://localhost:27017/userDB'); //it must be used here to connect to the server 


console.log(process.env.SECRET);
console.log(process.env.API_KEY);

//remeber if error comes use then start the server of mongod 
// by typing the mongod in the command 

//this is the userschmea   

const userSchema= new mongoose.Schema({        //This is the full fledged schema must be defined to use the database 
    email:String,                     
    password:String                   
});


////////*************This part came from the mongoose encryption webiste */

//this is the level 2 security things .
//for this we need to go  to the webiste mnogoose encryption npm and install the 
//  so we need to instll npm   mongoose encryption by using the npm i mongoose-encryption 
//you kow million of webiste is using this technolgoy .
//you should read the doucumnetion here we are using very basic only encryption part 
//it can be used for the authentication but we will do later we will do hashing algorithm
//we also add to var encrypt = require('mongoose-encryption');
//so we need to full fledged teh mongoose schmea 
//you must study aobut the pulgins on the mongoose webiste it is just little bit code helps to do 
//complex task.
            // const secret = "This is the little Secre t";
            //userSchema.plugin(encrypt, { secret:secret, encryptedFields: ['password'] }); this for level 2 security 
     userSchema.plugin(encrypt, { secret:process.env.SECRET, encryptedFields: ['password'] }); // this is for the level 3 security here encyprtion is the password field
//that's why we use the password there and remember that plugin is used here in above line   */
//you can add multiple things just after password like this ['password',"emial","keypass","etc"]

//remeber you must put userSchema.plugin befor mongoose model becuase we are passing the userschema
const User=new mongoose.model("User",userSchema);     // this is the model must be used after the schema cration 

app.get("/",function(req,res){
    res.render("home");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.get("/register",function(req,res){
    res.render("register");
})



app.post("/register",function(req,res){
    const newUser= new User({
        email:req.body.username,
        password:req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("secrets");
        }
    });
});
app.post("/login",function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    User.findOne({email:username},function(err,foundUser){
        if(err){console.log(err)}
        else{
            if(foundUser){
                if(foundUser.password===password){
                    res.render("secrets");
                }
            }
        }
    });
});


app.listen(3000,function(){
    console.log("Running on 3000");        //this all three line of the code helps use to listen this page on the 
    //port 3000 and console will return that sever is working fine 

})
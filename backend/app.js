const express = require("express");
const app = express();
const cors = require("cors")
// const mongoose = require("mongoose")
const { ObjectId } = require("mongodb");
const {connecttodb,getDB} = require('./db');
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken")

//define port
const port = 8000;

//express uses json
app.use(express.json());

//enabling cors on complete app
app.use(cors());

//dbConnection
let db
connecttodb((err)=>{
    if (!err){
        app.listen(port,()=>{
            // console.log({"powereater1":"uKnOnMZiFqqD1opR"})
            // console.log("mongodb+srv://powereater1:uKnOnMZiFqqD1opR@cluster0.9pvs1nh.mongodb.net/")
            // console.log("mongodb+srv://powereater1:<password>@cluster0.9pvs1nh.mongodb.net/")
        })
        db=getDB()   
    }
})

//routes for api requests
app.get('/users', (req, res) => {
    const users=[]
    db.collection('users')
    .find()
    .sort({name:1})
    .forEach((user) => users.push(user))
    .then(()=>{
        // console.log(users);
        // res.send(users);
        res.status(200).json(users)
    })
    .catch(()=>res.status(500).json({error:"could not fetch users"}))
})

app.post('/users/token',(req,res)=>{
    const {token} = req.body;
    try {
        db.collection('users').findOne({accessToken:token})
        .then((doc)=>{
            if (doc!=null){
                res.status(200).json({success:true,doc})
            }else{
                res.status(200).json({success:false})
            }
        })
    } catch (error) {
        res.status(200).json({success:false})
    }
})

app.post('/users',(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        res.status(420);
        throw new Error("All fields are mandatory")
    }
    db.collection('users').findOne({email,password})
    .then((doc)=>{
        if (doc!=null){
            var accessToken = jwt.sign({email,password},'secret',{expiresIn:"1h"});
            db.collection('users').findOneAndUpdate({email,password},{$set:{accessToken}})
            res.status(200).json({success:"true",accessToken})
        }else{
            res.status(200).json({success:"false",data:"Incorrect email or password"})
        }
    })
    .catch((err)=>{
        res.status(404).json({success:"false",data:"could not fetch document"})
    })
})

app.get('/users/:id',(req,res)=>{
    const Id = new ObjectId(req.params.id)
    db.collection('users')
    .findOne({_id: Id})
    .then((doc)=>{
        res.status(200).json(doc)
    })
    .catch(err=>res.status(500).json({err:"Could not fetch document"}))
})  

app.post('/post',async (req,res)=>{
    const {data}=req.body;
    try {
        if (data == "hamza"){
            res.send({"status":"ok"})
        } else{
            res.send({"status":"User not found"})
        }
    } catch (error) {
        res.send({"status":"Something went wrong"})
    }
})

// mongoose connection
// const mongoURL = "mongodb+srv://powereater1:uKnOnMZiFqqD1opR@cluster0.9pvs1nh.mongodb.net/"
// mongoose.connect(mongoURL,{
//     // useNewUrlParser:true
// }).then((res)=>{
//     console.log("DB Connected");    
 
//     // const db=mongoose.getCollections();
//     // console.log(db)

// })
// .catch((e)=>{console.log(e)})

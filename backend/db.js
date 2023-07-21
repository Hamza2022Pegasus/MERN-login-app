const {MongoClient} = require('mongodb')
let dbConnection
module.exports = {
    connecttodb:(cb)=>{
        MongoClient.connect('mongodb+srv://powereater1:uKnOnMZiFqqD1opR@cluster0.9pvs1nh.mongodb.net/')
        .then((client)=>{
            dbConnection = client.db("sample_mflix")
            return cb();
        })
        .catch((err)=>{
            console.log(err)
            return cb(err)
        })
    },
    getDB:()=>dbConnection
}
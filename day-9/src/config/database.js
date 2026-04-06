const mongoose = require('mongoose')


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then((req,res)=>{
        console.log('connected to db')
    })
}

module.exports = connectToDb
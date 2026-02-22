const mongoose = require('mongoose')


function connecToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(res=>{
        console.log('connected to db')
    })
}

module.exports = connecToDb
const mongoose = require('mongoose')


async function connecToDB(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log('connected to mongo')
}

module.exports = connecToDB
const app = require('./src/app');

const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect("mongodb+srv://sifat:e4pxr8RaaqM0oYNH@cluster0.perli6o.mongodb.net/day-6")
    .then(()=>{
        console.log('Connected to Database')
    })
}

connectToDb()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
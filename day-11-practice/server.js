require('dotenv').config();
const app = require('./src/app');
const connecToDB = require('./src/config/database');

connecToDB();





app.listen(3000,()=>{
    console.log('port is running on 3000')
})
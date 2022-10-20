const mongoose = require('mongoose');

const toConnectDatabase = ()=>{
    mongoose.connect('mongodb://localhost:27017/mylibrary' , ()=>{
        console.log('Connected to database');
    })

}
module.exports = toConnectDatabase;
const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookSchema = new Schema({
    title:{
        type: 'string',
        required: true
    },
    authore:{
        type: 'string',
        required: true
    },
    quantity:{
        type: 'number'
    }

});

bookSchema.methods.decBookCount = async function(){
    this.quantity = this.quantity-1;
    this.save();
}

bookSchema.methods.increaseBookCount = async function(){
    this.quantity = this.quantity+1;
    this.save();
}

const BookSchema = mongoose.model('BookSchema', bookSchema);

module.exports = BookSchema;
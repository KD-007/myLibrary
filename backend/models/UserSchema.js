const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    accountType:{
        type: 'string',
        required: true    
    },
    myBooks:[{
        title:{
            type: 'string'
        },
        authore:{
            type: 'string'
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }]

});

userSchema.methods.addBook = async function(data){
    try {
        this.myBooks.push(data);
        await this.save();

    } catch (error) {
        console.log("error while saving: " + error);
    }


}
userSchema.methods.removeBook = async function(id){
    try {
        this._v=this._v-1;
        const myBooks = this.myBooks.filter((element)=>{
            return element._id!=id;
        })
        this.myBooks = myBooks;
        await this.save();
        
    } catch (error) {
        console.log("error while returning: " + error);
    }

}


const UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;
const express = require('express');
const {body , validationResult} = require('express-validator');
const UserSchema = require('../models/UserSchema');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const SECRET_KEY="secret";

//--------------------------------------------------------------------------------------------------------------------------------
//To Create a new User

router.post('/createuser',[
            body('name').isLength({min:2}),
            body('email',"enter valid email").isEmail()
            ], async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(401).json({errors:errors.message}) };
        try {
            const {name , email , password , accountType} = req.body;
            let user = await UserSchema.findOne({email});

            if(user){return res.status(200).json({errors:"user already exists"})};

            const salt =await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password , salt);
            user = new UserSchema({name, email, password:hashPass, accountType});
            user = await user.save();
            const data={
                user:{
                    id: user._id
                }
            }
            const token = jwt.sign(data,SECRET_KEY);
            res.send({token : token });
    
        } catch (error) {
            res.send({error:error});
        }

})

//---------------------------------------------------------------------------------------------------------------------
//To Login

router.post('/login',[
    body('email',"enter valid email").isEmail(),
    body('password','enter valid password').exists()
    ], async(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){return res.status(401).json({errors:errors.message}) };
try {
    const { email , password , accountType} = req.body;
    let user = await UserSchema.findOne({email});
    if(!user){return res.status(200).json({errors:"invalid credentials"})};
    const passwordCompare =await bcrypt.compare(password , user.password);
    if(passwordCompare==true && accountType ===user.accountType){
        const data={
            user:{
                id: user._id
            }
        }
        const token = jwt.sign(data,SECRET_KEY);
        res.send({token:token});
    }else{
        return res.status(200).json({errors:"invalid Credentials"});
    }
;

} catch (errors) {
    res.send({errors:errors});
}

})







module.exports = router;
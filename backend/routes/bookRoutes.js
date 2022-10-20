const express = require('express');
const {body, validationResult} = require('express-validator');


const BookSchema = require('../models/BookSchema');
const UserSchema = require('../models/UserSchema');
const middleware = require('../middleware/middleware');


const router = express.Router();

//------------------------------For Operations Performed by both----------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//Fetch all books
router.get('/fetchallbooks/',middleware , async(req, res)=>{
    try {
        const id = req.user.id;
        const user = await UserSchema.findOne({_id:id});
        if(!user){return res.status(401).json({error:"unauthorized access"})};
        
        let book = await BookSchema.find();

        if(book!=null){

            return res.send({book:book ,userType:user.accountType , userName:user.name });
        };               
        return res.status(401).json({error:"book doesn't exist"});
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }

})
//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------For Operations Performed by Teacher----------------------------------------------------------------
//Add Book in Database
router.post('/addbook',[
        body('title').exists(),
        body('authore').exists(),
        body('quantity').isLength({min:1})
        ],middleware , async(req, res)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){return res.status(403).json({error:errors.message})};
            try {
                const id = req.user.id;
                const user = await UserSchema.findOne({_id:id});
                if(!user.accountType==="teacher"){return res.status(401).json({error:"unauthorized access"})};
                const {title , authore , quantity}= req.body;
                let book = await BookSchema.exists({title,authore});
        
                if(book===null){
                    book = new BookSchema({title, authore, quantity});
                    await book.save();
                    return res.send({book});
                };               
                return res.status(200).json({error:"book already exist in Database"});
                
            } catch (error) {
                return res.status(401).json({error:error.message});
            }

})

//---------------------------------------------------------------------------------------------------------------------
//To Delete Book From Database 


router.delete('/deletebook/:id',middleware , async(req, res)=>{
        try {
            const id = req.user.id;
            const user = await UserSchema.findOne({_id:id});
            if(!user.accountType==="teacher"){return res.status(401).json({error:"unauthorized access"})};
            
            let book = await BookSchema.exists({_id:req.params.id});

            if(book!=null){
                book = await BookSchema.findByIdAndDelete({_id:req.params.id});
                return res.send({book});
            };               
            return res.status(401).json({error:"book doesn't exist"});
            
        } catch (error) {
            return res.status(401).json({error:error.message});
        }

})

//------------------------------------------------------------------------------------------------
//Edit Book in Database
router.put('/updatebook/:id',middleware , async(req, res)=>{
    try {
        const id = req.user.id;
        const user = await UserSchema.findOne({_id:id});
        if(!user.accountType==="teacher"){return res.status(401).json({error:"unauthorized access"})};

        const {title, authore , quantity} = req.body;
        const newBook={};
        if(title){newBook.title = title};
        if(authore){newBook.authore = authore};
        if(quantity){newBook.quantity = quantity};
        
        let book = await BookSchema.exists({_id:req.params.id});
        
        if(book!=null){
            book = await BookSchema.findByIdAndUpdate({_id:req.params.id} , {$set:newBook} ,{new:true} );
            return res.send({book});
        };               
        return res.status(401).json({error:"book doesn't exist"});
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }

})

//--------------------------------------------------------------------------------------------------
//------------------------------For Operations Performed by Student----------------------------
//--------------------------------------------------------------------------------------------------
//request a book 
router.post('/requestbook',[
    body('title').exists(),
    body('authore').exists()
    ],middleware , async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(403).json({error:errors.message})};
        try {
            const id = req.user.id;
            const user = await UserSchema.findOne({_id:id});
            if(!user.accountType==="student"){return res.status(401).json({error:"unauthorized access"})};
            const {title , authore }= req.body;
            //to check if book is already owned
            const isFound = user.myBooks.some(element => {
                if (element.title === title && element.authore === authore) {
                  return true;
                }
                return false;
            })
            

            const book = await BookSchema.findOne({title,authore});
            if(isFound){return res.status(200).json({message:"book already owned"})};
            if(book.quantity===0){return res.status(200).json({message:"book doesn't available to request"})};
            
            if(book!==null && isFound===false){
                book.decBookCount();
                user.addBook({title:book.title,authore:book.authore});
                return res.send({book});
            };               
            return res.status(401).json({error:"book doesn't available to request"});
            
        } catch (error) {
            return res.status(401).json({error:error.message});
        }

})

//------------------------------------------------------------------------------------------------
//For returning book
router.post('/returnbook',[
    body('title').exists(),
    body('authore').exists()
    ],middleware , async(req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(403).json({error:errors.message})};
        try {
            const id = req.user.id;
            const user = await UserSchema.findOne({_id:id});
            if(!user.accountType==="student"){return res.status(401).json({error:"unauthorized access"})};
            const {title , authore }= req.body;
            //to check if book is already owned
            const isFound = user.myBooks.find(element => {
                if (element.title === title && element.authore === authore) {
                  return element
                }
                return false;
            })
            

            const book = await BookSchema.findOne({title,authore});
            
            if(book!=null && isFound!=false){
                book.increaseBookCount();
                user.removeBook(isFound._id);
                return res.send({book});
            };               
            return res.status(401).json({error:"book doesn't available to request"});
            
        } catch (error) {
            return res.status(401).json({error:error.message});
        }

})
//--------------------------------------------------------------------------------------------------------------------------------
//fetch owned books 

router.get('/fetchmybooks/',middleware , async(req, res)=>{
    try {
        const id = req.user.id;
        const user = await UserSchema.findOne({_id:id});
        if(!user.accountType==="student"){return res.status(401).json({error:"unauthorized access"})};
        
        const myBooks = user.myBooks;

        // if(myBooks!=null){
            
        return res.send({myBooks});
        // };               
        // return res.json({error:"book doesn't exist"});
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }

})








module.exports =router;
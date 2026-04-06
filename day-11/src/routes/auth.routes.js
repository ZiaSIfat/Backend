const express = require('express')

const authRouter = express.Router()

authRouter.post('/register',async (req,res)=>{

    const {email,password,username,bio,profileImage} = req.body

    const isUserExistByEmail = await userModel.findOne({email})

    if(isUserExistByEmail){
        return res.status(409).json({message: 'User with this email already exists'})
    }

    const isUserExistByUsername = await userModel.findOne({username})

    if(isUserExistByUsername){
        return res.status(409).json({message: 'User with this username already exists'})
    }

})
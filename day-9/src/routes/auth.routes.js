const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post('/register', async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadYExists = await userModel.findOne({email})

    if(isUserAlreadYExists){
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }
    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
)

    res.cookie('jwt_token',token)

    res.status(201).json({
        message: 'User Registered',
        user,
        token
    })
})

module.exports = authRouter
const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const authRouter = express.Router()

authRouter.post('/register', async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadYExists = await userModel.findOne({email})

    if(isUserAlreadYExists){
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        email,password: hash ,name
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

authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message: 'This is a protected route'
    })

}
)

authRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordMatched = hash == user.password
    if(!isPasswordMatched){
        return res.status(404).json({
            message: 'Invalid passwod'
        })
    }

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET,{expiresIn: '1h'}
)
    res.cookie('token',token)

    res.status(200).json({
        message: 'User logged in',
        user:{
            name: user.name,
            email: user.email
        }
    })

})

authRouter.get('get-me',async (req,res)=>{
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)
    res.json({
        name: user.name,
        email: user.email
    })
})

module.exports = authRouter
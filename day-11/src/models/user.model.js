const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: [true, ' Username already exists'],
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    bio: String,
    profileImage: {
        type: String,
        default: 'https://ik.imagekit.io/evkehxepo0/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp'
    }
})

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel

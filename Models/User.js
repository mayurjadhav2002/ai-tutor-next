const mongoose = require('mongoose')
const User = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type:String,
        required: false
    },
    // Terms and Condition Checkbox
    tc: {
        type:Boolean,
        default: false,
        required:true
    },
    avatar:{
        type:String,
        default: `${process.env.BACKEND_URL}/static/newUser.jpg`
    },
    password_reset:{
        type:String,
        default: ""
    },
    //  token sent to brower
    password_reset_token:{
        type:String,
        default: ""
    },
    // If it is organization Account
    organization:{
        type: Boolean,
        default: false
    },
    organization_name:{
        type:String,
        default: ""
    },
    
    access_token: {
        type:String,
        default: ""
    },
    signInType: [{
        google: {
            type: Boolean,
            default: false
        },
        normal: {
            type: Boolean,
            default: false
        },
        github: {
            type: Boolean,
            default: false
        }
    }],
    verified_account: {
        type:Boolean,
        default: true // for demo purpose
    },
    verification_token:{
        type:String,
        default:""
    },
    delete_account: {
        type: Boolean,
        default:false
    }
}, {timestamps: true});

User.method({
    async authenticate(password) {
        return bcrypt.compare(password, this.hash_password);
    },
});

module.exports = mongoose.model('User', User);
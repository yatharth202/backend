import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import brcrypt from "bcrpyt"

const userSchema = new schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
        },
        fullName : {
            type: String,
            required: true,
            trim: true,
            index:true
        },
        avatar : {
            type: String, // url
            required : true,

        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password:{
            type: String,
            required: [true,'Password is required']

        },

        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save",async function (next) { // .pre is a hook middleware // save hone se pahalge hash kar do
    if(!this.isModified("password")) return next();
    this.password=brcrypt.hash(this.password,10) // No of rounds hash rounds
    next()
}) //middle ware hai //dont use key arrow fucntion beacuse this context is not found in that
 //.methods help to create new method
userSchema.methods.isPasswordCorrect = async function(password){
    return await brcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign( //.sign generate token in jwt
    { //payLoad
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    { //payLoad
        _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema)
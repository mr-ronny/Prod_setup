import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String, // cloudinary url
    required: true
  },
  coverImage: {
    type: String // cloudinary
  },
  watchHistory: [{
    type: Schema.Types.ObjectId,
    ref: "video"
  }],
  password: {
    type: String,
    required: [true, "password is required"]
  },
  refreshToken: {
    type: String
  }
}, { timestamps: true });

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Access Token generation method
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,  
    username: this.username,
    fullname: this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });
};

// JWT Refresh Token generation method
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
  },
  process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};

export const User = mongoose.model("User", userSchema);

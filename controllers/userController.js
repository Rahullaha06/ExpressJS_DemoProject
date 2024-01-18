const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a User
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler (async (req, res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered");
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("The hash password is : ", hashPassword);

    const user = await User.create ({
        userName,
        email,
        password: hashPassword,
    });
    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
});

//@desc Login a User
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are required");
    }
    const user = await User.findOne({email});
    //Compair password with hashed password
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.userName,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("User is not Authorized");
    }
});

//@desc Current user info
//@route GET /api/user/current
//@access private

const currentUser = asyncHandler (async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};
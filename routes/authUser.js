const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req,res) => {

    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});

    // check if email is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send({message: "Email already exists!"});

    // check if username is already in the database
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send({message: "Username already exists!"});

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const user = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            isPsy: req.body.isPsy
        });

        const savedUser = await user.save();
        res.json({id: savedUser._id});

    }catch(err) {
        res.status(400).json({message: err});
    }
});

router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});

    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send({message: "Username is not found."});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({message: "Invalid password."});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: '10h' });

    res.send({accessToken: token});
});



module.exports = router;
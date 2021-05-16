const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.get('/', async (req, res) => {
    try{
        const psychologists = await User.find({isPsy: true});
        res.json(psychologists);
    }catch(err) {
        res.json({message: err});
    }

});

module.exports = router;

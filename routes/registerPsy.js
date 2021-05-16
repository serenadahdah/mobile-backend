const router = require('express').Router();
const User = require('../models/User');

router.put('/', async (req, res) => {
    const id = req.user._id;
    console.log(id);
    const updatedUser = await User.updateOne({ _id: id }, {
        $set: {
            isPsy: true
        }
    });
    res.json(updatedUser);
});


module.exports = router;
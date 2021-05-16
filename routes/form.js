const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');

const Form = require('../models/Form');
const User = require('../models/User');

router.get('/:psyId', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.psyId});
        if(!user) return res.status(400).send();

        const form = await Form.findOne({psyId: req.params.psyId});
        if(!form) return res.status(404).send();

        res.json(form);

    }catch(err) {
        res.json({message: err});
    }

});

router.post('/', async (req,res) => {

    const formExist = await Form.findOne({psyId: req.user.id});
    if(formExist) return res.status(400).send();

    const form = new Form({
        psyId: req.user.id,
        sex: req.body.sex,
        age: req.body.age,
        address: req.body.address,
        profession: req.body.profession,
        AgeClient: req.body.AgeClient
    })
    try {
        const savedForm = await form.save();
        res.json(savedForm)
    }catch(err) {
        res.json({message: err});
    }

});

router.put('/', async (req, res) => {
    try{
        const form = await Form.findOne({ _id: req.user.id});
        if(!form) return res.status(404).send();

        const updatedForm = await Form.updateOne({ _id: req.user.id }, {
            $set: {
                sex: req.body.sex,
                age: req.body.age,
                address: req.body.address,
                profession: req.body.professions,
                AgeClient: req.body.AgeClient
            }
        });
        res.json(updatedForm);
        
    }catch(err) {
        res.status(500).json({message: err});
    }

});


module.exports = router;
const mongoose = require('mongoose');

const ClientAge = mongoose.Schema({
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
});

ClientAge.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    return obj;
}


const Form = mongoose.Schema({
    psyId: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    AgeClient: {
        type: [ClientAge],
        required: true
    }
});

Form.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
}


module.exports = mongoose.model('psychologistForm', Form);
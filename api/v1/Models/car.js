const mongoose = require('mongoose');

const { Schema } = mongoose;

const carSchema = Schema({

    model: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('Car', carSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const carSchema = Schema({

    model: {
        type: String,
        require: true  // reauire or required? Be attentive...
    },
});

module.exports = mongoose.model('Car', carSchema);

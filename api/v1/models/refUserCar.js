const mongoose = require('mongoose');

const { Schema } = mongoose;

const refUserCarSchema = new Schema({

    userId: {
        type: Schema.ObjectId,
        ref: "User",
    },
    carId: {
        type: Schema.ObjectId,
        ref: "Car"
    },
});

module.exports = mongoose.model('refUserCar', refUserCarSchema);

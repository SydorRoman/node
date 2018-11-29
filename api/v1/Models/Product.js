const mongoose = require('mongoose');

const { Schema } = mongoose;

const productScheme = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  about: {
    type: String,
    maxlength: 300,
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

productScheme.methods.searchByUserID = function (userId) { // no 'function'  () => {}
  return this.model('Product').find({ userId });
};

module.exports = mongoose.model('Product', productScheme);
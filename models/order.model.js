const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  contact: String,
  address: String,
  appointmentPlace: String,
  appointmentDate: String,
  instaId: String,
  appointmentType: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
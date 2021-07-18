const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['link', 'page']
    },
    link: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    imageID: {
      type: String,
      required: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('Company', companySchema);

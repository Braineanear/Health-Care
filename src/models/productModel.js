const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: String,
    company: {
      type: String,
      required: true
    },
    firstImage: {
      type: String,
      default: ''
    },
    firstImageID: {
      type: String,
      default: ''
    },
    secondImage: {
      type: String,
      default: ''
    },
    secondImageID: {
      type: String,
      default: ''
    }
  },
  { timestamp: true }
);

productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', productSchema);

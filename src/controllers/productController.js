const { editImage } = require('../utils/sharpHelper');
const dataUri = require('../utils/datauriHelper');
const catchAsync = require('../utils/catchAsync');
const { uploadFiles, destroy } = require('../utils/cloudinaryHelper');
const Product = require('../models/productModel');

exports.getAllProducts = catchAsync(async (req, res) => {
  const data = await Product.find();

  if (!data) {
    return res.json({
      type: 'error',
      message: 'Something Went Wrong!'
    });
  }

  return res.json({ data });
});

exports.createNewProduct = catchAsync(async (req, res) => {
  const { productName, productCompany } = req.body;
  const images = req.files;

  if (
    Object.keys(images).length !== 2 ||
    productName === '' ||
    productCompany === ''
  ) {
    return res.json({ type: 'error', message: 'All Fields are required.' });
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/'/g, '');
  };
  const folderName = 'Health Care/Products';

  const uploadFrontImage = await uploadFiles(
    dataUri(images.productFrontImage[0].buffer).content,
    `${folderName}/${capitalize(productName)}`
  );

  const company = productCompany.trim().split(' ').join('-');
  const result = await Product.create({
    name: productName,
    company,
    firstImage: uploadFrontImage.secure_url,
    firstImageID: uploadFrontImage.public_id
  });

  return res.json({
    type: 'success',
    message: 'Product created successfully',
    result
  });
});

exports.uploadSecondImage = catchAsync(async (req, res) => {
  const { id, productName } = req.body;
  const images = req.files;

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/'/g, '');
  };

  const folderName = 'Health Care/Products';
  const uploadBackImage = await uploadFiles(
    dataUri(images.productBackImage[0].buffer).content,
    `${folderName}/${capitalize(productName)}`
  );

  const result = await Product.findByIdAndUpdate(id, {
    secondImage: uploadBackImage.secure_url,
    secondImageID: uploadBackImage.pubilc_id
  });

  return res.json({
    type: 'success',
    message: 'Company created successfully',
    result
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) {
    return res.json({
      type: 'error',
      message: 'Something Went Wrong'
    });
  }

  destroy(product.firstImageID);
  destroy(product.secondImageID);

  await Product.findByIdAndDelete({ _id: id });

  return res.json({
    type: 'success',
    message: 'Product Deleted Successfully'
  });
});

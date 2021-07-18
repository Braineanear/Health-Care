const catchAsync = require('../utils/catchAsync');
const Company = require('../models/companyModel');
const Product = require('../models/productModel');

exports.homePage = catchAsync(async (req, res) => {
  const companyData = await Company.find();

  res.render('website/home', { title: 'Homepage', companyData });
});

exports.contactPage = catchAsync(async (req, res) => {
  const companyData = await Company.find();

  res.render('website/contact', { title: 'Contact Us', companyData });
});

exports.errorPage = (req, res) => res.render('error/404', { title: '404' });

exports.productsPage = catchAsync(async (req, res) => {
  const companyData = await Company.find();
  const productData = await Product.find({ company: req.params.name });

  res.render('website/products', {
    title: 'Products',
    productData,
    companyData
  });
});

exports.productPage = catchAsync(async (req, res) => {
  const { name } = req.params;
  const companyData = await Company.find();
  const productData = await Product.findOne({
    slug: name
  });

  res.render('website/product', {
    title: productData.name,
    productData,
    companyData
  });
});

const catchAsync = require('../utils/catchAsync');
const Company = require('../models/companyModel');
const Product = require('../models/productModel');

exports.dashboard = catchAsync(async (req, res) => {
  const compaines = await Company.find();
  const products = await Product.find();

  const totalCompanies = compaines.length;
  const totalProducts = products.length;

  res.render('admin/dashboard', {
    title: 'Dashboard',
    totalCompanies,
    totalProducts
  });
});

exports.company = (req, res) =>
  res.render('admin/company', { title: 'Company' });

exports.product = catchAsync(async (req, res) => {
  const companyData = await Company.find();

  res.render('admin/product', { title: 'Product', companyData });
});

const catchAsync = require('../utils/catchAsync');
const Company = require('../models/companyModel');

exports.dashboard = catchAsync(async (req, res) => {
  const data = await Company.find();

  const totalCompanies = data.length;

  res.render('admin/dashboard', { title: 'Dashboard', totalCompanies });
});

exports.company = (req, res) =>
  res.render('admin/company', { title: 'Company' });

exports.product = catchAsync(async (req, res) => {
  const companyData = await Company.find();

  res.render('admin/product', { title: 'Product', companyData });
});

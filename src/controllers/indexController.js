const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const catchAsync = require('../utils/catchAsync');
const Company = require('../models/companyModel');
const Product = require('../models/productModel');

dotenv.config({
  path: 'config.env'
});

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

exports.contact = catchAsync(async (req, res) => {
  const { name, email, phone, subject, company, country, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const text = `
    name: ${name}
    email: ${email}
    phone: ${phone}
    company: ${company}
    country: ${country}
    subject: ${subject}
    message: ${message}
  `;

  const mailOptions = {
    to: process.env.EMAIL_FROM,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(err);
    } else {
      res.json(info);
    }
  });
});

const { editImage } = require('../utils/sharpHelper');
const dataUri = require('../utils/datauriHelper');
const catchAsync = require('../utils/catchAsync');
const { uploadFiles, destroy } = require('../utils/cloudinaryHelper');
const Company = require('../models/companyModel');

exports.getAllCompanies = catchAsync(async (req, res) => {
  const data = await Company.find();

  if (!data) {
    return res.json({
      type: 'error',
      message: 'Something Went Wrong!'
    });
  }

  return res.json({ data });
});

exports.createNewCompanyLink = catchAsync(async (req, res) => {
  const {
    companyLinkName,
    companyLinkLink,
    companyLinkType,
    companyLinkDescription
  } = req.body;
  const image = req.file;

  if (
    Object.keys(image).length === 0 ||
    companyLinkName === '' ||
    companyLinkLink === '' ||
    companyLinkType === '' ||
    companyLinkDescription === ''
  ) {
    return res.json({ type: 'error', message: 'All Fields are required.' });
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/'/g, '');
  };

  const folderName = 'Company';
  const resizedImage = await editImage(image.buffer);
  const base64image = dataUri(resizedImage);
  const uploadImage = await uploadFiles(
    base64image.content,
    `${folderName}/${capitalize(companyLinkName)}`
  );

  const result = await Company.create({
    name: companyLinkName,
    type: companyLinkType,
    link: companyLinkLink,
    description: companyLinkDescription,
    image: uploadImage.secure_url,
    imageID: uploadImage.public_id
  });

  return res.json({
    type: 'success',
    message: 'Company created successfully',
    result
  });
});

exports.createNewCompanyPage = catchAsync(async (req, res) => {
  const { companyPageName, companyPageType, companyPageDescription } = req.body;
  const image = req.file;

  if (
    Object.keys(image).length === 0 ||
    companyPageName === '' ||
    companyPageType === '' ||
    companyPageDescription === ''
  ) {
    return res.json({ type: 'error', message: 'All Fields are required.' });
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/'/g, '');
  };

  const folderName = 'Company';
  const resizedImage = await editImage(image.buffer);
  const base64image = dataUri(resizedImage);
  const uploadImage = await uploadFiles(
    base64image.content,
    `${folderName}/${capitalize(companyPageName)}`
  );

  const link = `/products/${companyPageName.trim().split(' ').join('-')}`;

  const result = await Company.create({
    name: companyPageName,
    type: companyPageType,
    link,
    description: companyPageDescription,
    image: uploadImage.secure_url,
    imageID: uploadImage.public_id
  });

  return res.json({
    type: 'success',
    message: 'Company created successfully',
    result
  });
});

exports.updateCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, type, link, imageID } = req.body;
  const image = req.file;

  if (
    Object.keys(image).length === 0 ||
    name === '' ||
    type === '' ||
    link === ''
  ) {
    return res.json({ type: 'error', message: 'All Fields are required.' });
  }

  destroy(imageID);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/'/g, '');
  };

  const folderName = 'Company';
  const resizedImage = await editImage(image.buffer);
  const base64image = dataUri(resizedImage);
  const uploadImage = await uploadFiles(
    base64image.content,
    `${folderName}/${capitalize(name)}`
  );

  const company = await Company.findOne({ _id: id });

  if (!company) {
    return res.json({
      type: 'error',
      message: 'Something Went Wrong'
    });
  }

  await Company.findOneAndUpdate(
    { _id: id },
    {
      name,
      type,
      link,
      image: uploadImage.secure_url,
      imageID: uploadImage.public_id
    }
  );

  return res.json({
    type: 'success',
    message: 'Company Updated Successfully',
    itemImageURL: uploadImage.secure_url,
    itemImageID: uploadImage.public_id
  });
});

exports.deleteCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOne({ _id: id });

  if (!company) {
    return res.json({
      type: 'error',
      message: 'Something Went Wrong'
    });
  }

  destroy(company.imageID);

  await Company.findByIdAndDelete({ _id: id });

  return res.json({
    type: 'success',
    message: 'Company Deleted Successfully'
  });
});

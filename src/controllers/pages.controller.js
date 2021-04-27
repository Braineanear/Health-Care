import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const homePage = catchAsync(async(req, res, next) => {
  return res.render('website/home', { title: 'Home' });
});

export const contactPage = catchAsync(async(req, res, next) => {
  return res.render('website/contact', { title: 'Contact Us'})
});

import catchAsync from '../utils/catchAsync';

export const homePage = catchAsync(async (req, res, next) =>
  res.render('website/home', { title: 'Home' })
);

export const contactPage = catchAsync(async (req, res, next) =>
  res.render('website/contact', { title: 'Contact Us' })
);

export const productsPage = catchAsync(async (req, res, next) =>
  res.render('website/products', { title: 'Products' })
);

export const productPage = catchAsync(async (req, res, next) =>
  res.render('website/product', { title: 'Product' })
);

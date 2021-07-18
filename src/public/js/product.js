const productArea = document.querySelector('.productArea');
const { productForm } = document.forms;
const clearProduct = document.querySelector('.clearProduct');

clearProduct.addEventListener('click', (e) => {
  e.preventDefault();

  productForm.productName.value = '';
  productForm.productCompany.value = '';

  new Noty({
    type: 'success',
    timeout: 2000,
    text: 'Form Cleared Successfully',
    progressBar: false
  }).show();
});

const ProductTemplate = (product) => `
<div class="card-container col-12 col-md-6 col-lg-3" data-id="${product._id}">
  <div class="card">
    <img class="product-image w-75 mb-4" src="${product.firstImage}" alt="${product.firstImageID}" />
    <h4 class="product-name">
      ${product.name}
    </h4>
    <div class="buttons mt-4">
      <button class="primary ghost removeProduct">
        Remove
      </button>
    </div>
  </div>
</div>`;

const createNewProduct = async (e) => {
  e.preventDefault();

  let counter = 0;
  const elements = [...productForm.elements];

  elements.forEach((element) => {
    if (element.tagName.toLowerCase() !== 'button') {
      const elementName = element.getAttribute('name');
      const elementValue = element.value;
      const Error = document.querySelector(`.${elementName}Error`);

      if (elementValue === '') {
        Error.innerText = '* Please Fill the Field';
        counter += 1;
      } else {
        Error.innerText = '*';
      }
    }
  });

  if (counter > 0) {
    new Noty({
      type: 'error',
      timeout: 2000,
      text: 'All Fields are required',
      progressBar: false
    }).show();

    return false;
  }

  const formData = new FormData(productForm);

  const result = await axios.post('/dashboard/product/data', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  formData.append('id', result.data.result._id);

  axios
    .post('/dashboard/product/data/second', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      new Noty({
        type: res.data.type,
        timeout: 2000,
        text: res.data.message,
        progressBar: false
      }).show();

      productArea.insertAdjacentHTML(
        'beforeend',
        ProductTemplate(res.data.result)
      );

      [...productForm.elements].forEach((element) => {
        if (element.tagName.toLowerCase() !== 'button') {
          element.value = '';
        }
      });

      return false;
    })
    .catch(() => {
      new Noty({
        type: 'error',
        timeout: 2000,
        text: 'Something Went Wrong!',
        progressBar: false
      }).show();
    });
};

const getProducts = axios
  .get('/dashboard/product/data')
  .then((res) => res.data.data)
  .catch(() => {
    new Noty({
      type: 'error',
      timeout: 2000,
      text: 'Something Went Wrong!',
      progressBar: false
    }).show();
  });

// Generate Services and Put it in the ul
const generateProducts = async () => {
  let result = await getProducts;
  result = result.map((item) => ProductTemplate(item)).join('');
  productArea.insertAdjacentHTML('beforeend', result);
};

// Executing Function
generateProducts();

const handleProductClicks = (e) => {
  e.preventDefault();
  const isRemoveBtn = e.target.classList.contains('removeProduct');

  if (isRemoveBtn) {
    e.preventDefault();

    const removeBtn = e.target;
    const currentProduct = removeBtn.parentElement.parentElement.parentElement;
    const currentProductID = currentProduct.dataset.id;

    const url = `/dashboard/product/data/${currentProductID}`;

    axios
      .delete(url)
      .then((res) => {
        currentProduct.remove();

        new Noty({
          type: res.data.type,
          timeout: 2000,
          text: res.data.message,
          progressBar: false
        }).show();
      })
      .catch(() => {
        new Noty({
          type: 'error',
          timeout: 2000,
          text: 'Something Went Wrong!',
          progressBar: false
        }).show();
      });
  }
};

productForm.addEventListener('submit', createNewProduct);
productArea.addEventListener('click', handleProductClicks);

const companyArea = document.querySelector('.companyArea');
const { companyLinkForm, companyPageForm } = document.forms;
const clearCompanyLink = document.querySelector('.clearCompanyLink');
const clearCompanyPage = document.querySelector('.clearCompanyPage');

clearCompanyLink.addEventListener('click', (e) => {
  e.preventDefault();

  companyLinkForm.companyLinkName.value = '';
  companyLinkForm.companyLinkLink.value = '';

  new Noty({
    type: 'success',
    timeout: 2000,
    text: 'Form Cleared Successfully',
    progressBar: false
  }).show();
});

clearCompanyPage.addEventListener('click', (e) => {
  e.preventDefault();

  companyPageForm.companyPageName.value = '';
  companyPageForm.companyPageDescription.value = '';

  new Noty({
    type: 'success',
    timeout: 2000,
    text: 'Form Cleared Successfully',
    progressBar: false
  }).show();
});

const CompanyLinkTemplate = (company) => `
<div class="card-container col-12 col-md-6 col-lg-3" data-id="${company._id}">
  <div class="card">
    <img class="company-link-image w-75 mb-4" src="${company.image}" alt="${company.imageID}" />
    <h4 class="company-link-name">
      ${company.name} | <a class="company-link-link" href="${company.link}">Link</a>
    </h4>
    <p class="company-link-description">${company.description}</p>
    <div class="buttons mt-4">
      <button class="primary ghost removeCompanyLink">
        Remove
      </button>
    </div>
  </div>
</div>`;

const CompanyPageTemplate = (company) => `
<div class="card-container col-12 col-md-6 col-lg-3" data-id="${company._id}">
  <div class="card">
    <img class="company-page-image w-75 mb-4" src="${company.image}" alt="${company.imageID}" />
    <h4 class="company-page-name">
      ${company.name} | <a class="company-page-link" href="${company.link}">Link</a>
    </h4>
    <p class="company-page-description">${company.description}</p>
    <div class="buttons mt-4">
      <button class="primary ghost removeCompanyPage">
        Remove
      </button>
    </div>
  </div>
</div>`;

const createNewCompanyLink = (e) => {
  e.preventDefault();

  let counter = 0;
  const elements = [...companyLinkForm.elements];

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

  const formData = new FormData(companyLinkForm);

  formData.append('companyLinkType', 'link');

  axios
    .post('/dashboard/company/data/link', formData, {
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

      companyArea.insertAdjacentHTML(
        'beforeend',
        CompanyLinkTemplate(res.data.result)
      );

      [...companyLinkForm.elements].forEach((element) => {
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

const createNewCompanyPage = (e) => {
  e.preventDefault();

  let counter = 0;
  const elements = [...companyPageForm.elements];

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

  const formData = new FormData(companyPageForm);

  formData.append('companyPageType', 'page');

  axios
    .post('/dashboard/company/data/page', formData, {
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

      companyArea.insertAdjacentHTML(
        'beforeend',
        CompanyPageTemplate(res.data.result)
      );

      [...companyPageForm.elements].forEach((element) => {
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

const getCompanyLinks = axios
  .get('/dashboard/company/data?type=link')
  .then((res) => res.data.data)
  .catch(() => {
    new Noty({
      type: 'error',
      timeout: 2000,
      text: 'Something Went Wrong!',
      progressBar: false
    }).show();
  });

const getCompanyPages = axios
  .get('/dashboard/company/data?type=page')
  .then((res) => console.log(res.data))
  .catch(() => {
    new Noty({
      type: 'error',
      timeout: 2000,
      text: 'Something Went Wrong!',
      progressBar: false
    }).show();
  });

// Generate Services and Put it in the ul
const generateCompanyLinks = async () => {
  let result = await getCompanyLinks;
  result = result.map((item) => CompanyLinkTemplate(item)).join('');
  companyArea.insertAdjacentHTML('beforeend', result);
};

const generateCompanyPages = async () => {
  let result = await getCompanyPages;
  result = result.map((item) => CompanyPageTemplate(item)).join('');
  companyArea.insertAdjacentHTML('beforeend', result);
};

// Executing Function
generateCompanyLinks();
generateCompanyPages();

const handleCompanyLinkClicks = (e) => {
  e.preventDefault();
  const isRemoveBtn = e.target.classList.contains('removeCompanyLink');

  if (isRemoveBtn) {
    e.preventDefault();

    const removeBtn = e.target;
    const currentCompanyLink =
      removeBtn.parentElement.parentElement.parentElement;
    const currentCompanyLinkID = currentCompanyLink.dataset.id;

    const url = `/dashboard/company/data/${currentCompanyLinkID}`;

    axios
      .delete(url)
      .then((res) => {
        currentCompanyLink.remove();

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

const handleCompanyPageClicks = (e) => {
  e.preventDefault();
  const isRemoveBtn = e.target.classList.contains('removeCompanyPage');

  if (isRemoveBtn) {
    e.preventDefault();

    const removeBtn = e.target;
    const currentCompanyPage =
      removeBtn.parentElement.parentElement.parentElement;
    const currentCompanyPageID = currentCompanyPage.dataset.id;

    const url = `/dashboard/company/data/page/${currentCompanyPageID}`;

    axios
      .delete(url)
      .then((res) => {
        currentCompanyPage.remove();

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

companyLinkForm.addEventListener('submit', createNewCompanyLink);
companyPageForm.addEventListener('submit', createNewCompanyPage);
companyArea.addEventListener('click', handleCompanyLinkClicks);
companyArea.addEventListener('click', handleCompanyPageClicks);

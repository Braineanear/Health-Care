const contactForm = document.getElementById('contact-form');
const btnSubmit = document.querySelector('.submitBtn');

const newMessage = async (e) => {
  e.preventDefault();

  const data = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    phone: contactForm.phone.value,
    subject: contactForm.subject.value,
    company: contactForm.company.value,
    message: contactForm.message.value
  };

  axios
    .post('/contact', data)
    .then(() => {
      new Noty({
        type: 'success',
        timeout: 2000,
        text: 'Message Sent Successfully',
        progressBar: false
      }).show();

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

btnSubmit.addEventListener('click', newMessage);

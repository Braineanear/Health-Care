$(document).ready(() => {
  const menuText = $('.menu-item-label');
  const { body } = document;

  const minimizeMenu = () => {
    if (
      window.matchMedia('(min-width: 992px)').matches &&
      window.matchMedia('(max-width: 1299px)').matches
    ) {
      menuText.addClass('op-lg-0-force d-lg-none');
      body.classList.add('collapsed-menu');
    } else if (
      window.matchMedia('(min-width: 1300px)').matches &&
      !body.classList.contains('collapsed-menu')
    ) {
      menuText.removeClass('op-lg-0-force d-lg-none');
      body.classList.remove('collapsed-menu');
    }
  };

  $(window).resize(() => {
    minimizeMenu();
  });

  minimizeMenu();

  document.addEventListener('mouseover', (e) => {
    e.stopPropagation();

    if (body.classList.contains('collapsed-menu')) {
      const targ = $(e.target).closest('.br-sideleft').length;
      if (targ) {
        body.classList.add('expand-menu');

        menuText.removeClass('d-lg-none');
        menuText.removeClass('op-lg-0-force');
      } else {
        body.classList.remove('expand-menu');

        menuText.addClass('op-lg-0-force');
        menuText.addClass('d-lg-none');
      }
    }
  });

  $('#btnLeftMenuMobile').on('click', () => {
    body.classList.add('show-left');
    return false;
  });

  document.addEventListener('click', (e) => {
    e.stopPropagation();

    if ($('body').hasClass('show-left')) {
      const target = $(e.target).closest('.br-sideleft').length;
      if (!target) {
        body.classList.remove('show-left');
      }
    }
  });

  $('#logout').click(async (e) => {
    e.preventDefault();
    await axios.post('/logout');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  });
});

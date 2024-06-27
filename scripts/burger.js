document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const burgerButton = document.querySelector('.burger-circle');
  const menuLinks = document.querySelectorAll('.menu-link');

  burgerButton.addEventListener('click', function () {    
    header.classList.toggle('open');
    document.body.classList.toggle('body-no-scroll', header.classList.contains('open'));
    window.scrollTo(0, 0);
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      header.classList.remove('open');
      document.body.classList.remove('body-no-scroll');
    });
  });

  window.addEventListener('resize', () => {
    const pageWidth = document.documentElement.clientWidth;
    if (pageWidth > 768) {
      header.classList.remove("open");
      document.body.classList.remove('body-no-scroll');
    }
  });
});

$(function(){

  $('.reviews__list').slick({
    autoplay: false,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    dots: true
  });

  var mixer = mixitup('.portfolio__inner');

  $(document).on("click", ".menu__link", function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // получаем координаты блока
    $('body, html').animate({ scrollTop: top }, 800); // плавно переходим к блоку
  });

  $(document).on("click", ".go_to_top", function (e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, 800);
  });

});
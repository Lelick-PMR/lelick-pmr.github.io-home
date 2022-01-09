//Консоль для проверки чего либо
// console.log('statusStat = ' + statusStat);
$(function () {

  //Пробую бургер меню
  //Чтобы не плодить много одинаковых строк
  //сделал отдельную функцию
  //по которой будем проверять состояние меню,
  //открывать и закрывать меню.
  var statusBurger = 0; //Переменная для контроля состояния меню.
  function burgerMenu(stBur) {
    var $menu = $('.menu'),
        $burger = $('.burger');
    if (statusBurger == 0) {
      $menu.css({ 'top': 0 });
      $burger.addClass('burger--active');
      statusBurger = stBur;
    } else if (statusBurger == 1) {
      $menu.css({ 'top': '-300vh' });
      $burger.removeClass('burger--active');
      statusBurger = stBur; 
    }
  }

  $(document).on("click", ".burger", function (e) {
    e.preventDefault();
    if (statusBurger == 0) {        //Если меню закрыто, то нужно открыть его,
      burgerMenu(1);                //Вызываем функцию, передав в нее параметр "1"
    } else if (statusBurger == 1) { //Но если меню открыто, то закроем его
      burgerMenu(0);                //Вызываем функцию, передав в нее параметр "0"
    }
  });

  // Галлерея портфолио
  var mixer = mixitup('.portfolio__inner');

  // Slick слайдер для отзывов
  $('.reviews__list').slick({
    autoplay: false,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    dots: true
  });

  //Плавная прокрутка страницы
  $(document).on("click", ".menu__link, .header__link", function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // получаем координаты блока
    $('body, html').animate({ scrollTop: top - 68}, 800); // плавно переходим к блоку -68 временное решение
    if (statusBurger == 1) {        //Если бургер меню вдруг открыто, то закроем его
      burgerMenu(0);                //Вызываем функцию, передав в нее параметр "0"
    }
  });
  //Плавная прокрутка страницы наверх через класс to-top
  $(document).on("click", ".to-top", function (e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, 800);
  });

  //Меню, крепим к верху при скролле
  $(document).ready(function () {
    var header = $('body, html').offset().top;

    $(window).scroll(function () {
      if ($(window).scrollTop() > header + 60) {
        $('.header__top').addClass('header__top--fixed');
      } else {
        $('.header__top').removeClass('header__top--fixed');
      }
    });
  });

  //Счетчик цифр в блоке со статистикой
  var $win = $(window);
  var winHeight = $win.height();
  $win.resize(function () { winHeight = $win.height(); });
  var
    statusDiag = 0,
    statusStat = 0,
    $stat = $('#statistics'),
    $statItem = $('.statistics__item'),
    $span = $('.statistics__count'),
    $skill = $('#skills'),
    $diagramm = $('.diagramm__percent');

  $win.scroll(function () {
    var winBottom = $win.scrollTop() + winHeight;

    $skill.each(function () {
      var currentPos = $(this).offset().top;
      if (statusDiag == 0 && winBottom > currentPos + 400) {
        $diagramm.each(function () {
          var
            percent = $(this).data('percent'),
            that = $(this);
          that.css({ 'width': percent + '%', 'transition': 'width 2000ms ease 0ms' });
          statusDiag = 1;
        });
      } else if (statusDiag == 1 && winBottom < currentPos) {
        $diagramm.each(function () {
          var
            that = $(this);
          that.css({ 'width': '0%' });
          statusDiag = 0;
        });
      }
    }
    );

    $stat.each(function () {
      var currentPos = $(this).offset().top;
      if (statusStat == 0 && winBottom > currentPos + 400) {
        var time = 2, cc = 1;
        if (cc < 2) {
          $statItem.addClass('statistics__item--visible');
          $span.each(function () {
            var
              i = 1,
              num = $(this).data('num'),
              step = 1000 * time / num,
              that = $(this),
              int = setInterval(function () {
                if (i <= num) {
                  that.html(i);
                } else {
                  cc = cc + 2;
                  clearInterval(int);
                }
                i++;
              }, step);
          });
          statusStat = 1; //выключил чтоб функция не повторялась
        }
      } else if (statusStat == 1 && winBottom < currentPos) {
        $statItem.removeClass('statistics__item--visible');
        $span.each(function () {
          var
            i = 0,
            that = $(this);
          that.html(i);
        });
        statusStat = 0;
      }
    });
  });
});

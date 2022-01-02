$(function () {

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
  //Пример нашел на просторах интернета
  $(document).on("click", ".menu__link", function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // получаем координаты блока
    $('body, html').animate({ scrollTop: top }, 800); // плавно переходим к блоку
  });
  //Лавная прокрутка страницы наверх через класс to-top
  $(document).on("click", ".to-top", function (e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, 800);
  });

  //Счетчик цифр в блоке со статистикой
  //естественно все смотрел в гугле
  //потом и с диаграммой решил поиграться
  //не думаю что по коду тут все правильно но работает
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
      console.log('statusStat = ' + statusStat);
      console.log('currentPos = ' + currentPos);
      console.log('winBottom = ' + winBottom);
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

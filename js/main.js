//Консоль для проверки чего либо
// console.log('statusStat = ' + statusStat);
$(function () {
  
var $doc = $(document);
var statusContent = 1;

var boxshadow = "";
var boxshadow2 = "";

for(var i = 0; i <= 500; i++){
    px = Math.random() < 0.5 ? "-" : "";
    py = Math.random() < 0.5 ? "-" : "";
    x = Math.floor((Math.random() * window.innerWidth) + 1);
    y = Math.floor((Math.random() * window.innerHeight) + 1);
    s = Math.floor((Math.random() * 2) - 1);
    boxshadow += px+x+"px "+py+y+"px 0 "+s+"px #fff,";
}

boxshadow = boxshadow.slice(0, -1);
$('.stars').css({'box-shadow': boxshadow});

for(var j = 0; j <= 500; j++){
    px = Math.random() < 0.5 ? "-" : "";
    py = Math.random() < 0.5 ? "-" : "";
    x = Math.floor((Math.random() * window.innerWidth) + 1);
    y = Math.floor((Math.random() * window.innerHeight) + 1);
    s = Math.floor((Math.random() * 2) - 1);
    boxshadow2 += px+x+"px "+py+y+"px 0.5px "+s+"px #fff,";
}

boxshadow2 = boxshadow2.slice(0, -1);
$('.stars2').css({'box-shadow': boxshadow2});

//открывать и закрывать меню.
  function contentButton(stBtn) {
    var $wrap = $('.wrapper'),
      $btntxtOn = $('.btn__text-on'),
      $btntxtOff = $('.btn__text-off'),
      $btnChk = $('.btn__chek');
    if (statusContent == 1) {
      $wrap.css({ 'display': 'none' });
      $btnChk.css({'left': 0});
      $btntxtOn.removeClass('btn__text-on--on');
      $btntxtOff.removeClass('btn__text-off--off');
      $btntxtOn.addClass('btn__text-on--off');
      $btntxtOff.addClass('btn__text-off--on');
      statusBurger = stBtn;
    } else if (statusContent == 1) {
      $wrap.css({ 'display': 'block' });
      $btnChk.css({'left': '50%'});
      $btntxtOn.removeClass('btn__text-on--off');
      $btntxtOff.removeClass('btn__text-off--on');
      $btntxtOn.addClass('btn__text-on--on');
      $btntxtOff.addClass('btn__text-off--off');


      statusContent = stBtn;
    }
  }

  $doc.on("click", ".btn", function (e) {
    e.preventDefault();
    if (statusContent == 1) {        //Если меню закрыто, то нужно открыть его,
      contentButton(0);                //Вызываем функцию, передав в нее параметр "1"
    } else if (statusContent == 0) { //Но если меню открыто, то закроем его
      contentButton(1);                //Вызываем функцию, передав в нее параметр "0"
    }
  });



});
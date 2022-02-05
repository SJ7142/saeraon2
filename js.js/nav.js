$(document).ready(function () {
  // header scroll event
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
      $('header').addClass('header-scroll')
      $('.header_nav li > a').css('color', 'black')
      $('.n_logo').addClass('logo-scroll')
      $('.ham > span').css('border-bottom', '1.5px solid black')
    } else {
      $('header').removeClass('header-scroll')
      $('.header_nav li > a').css('color', 'white')
      $('.n_logo').removeClass('logo-scroll')
      $('.ham > span').css('border-bottom', '1.5px solid white')
    }
    $('.header_nav li > a').hover(
      function () {
        if ($(window).scrollTop() >= 50) {
          $(this).addClass('after')
        } else {
          $(this).removeClass('after')
        }
      },
      function () {
        $(this).removeClass('after')
      }
    )
  })

  // Mobile Nav
  $('.ham').click(function () {
    $(this).toggleClass('active')
    if ($('.ham').hasClass('active')) {
      $('header').addClass('header-scroll')
      $('.n_logo').addClass('logo-scroll')
      $('.ham > span').css('border-bottom', '1.5px solid black')
      $('#mNav').stop().animate(
        {
          right: 0,
        },
        500
      )
      $('body').addClass('body-scroll')
    } else {
      $('header').removeClass('header-scroll')
      $('.n_logo').removeClass('logo-scroll')
      $('.ham > span').css('border-bottom', '1.5px solid white')
      $('#mNav').stop().animate(
        {
          right: '-100%',
        },
        500
      )
      $('body').removeClass('body-scroll')
    }
  })
})

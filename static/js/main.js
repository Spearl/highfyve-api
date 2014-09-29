
/*
 __  __     __     ______     __  __        ______   __  __     __   __   ______     ______    
/\ \_\ \   /\ \   /\  ___\   /\ \_\ \      /\  ___\ /\ \_\ \   /\ \ / /  /\  ___\   /\  ___\   
\ \  __ \  \ \ \  \ \ \__ \  \ \  __ \     \ \  __\ \ \____ \  \ \ \'/   \ \  __\   \ \___  \  
 \ \_\ \_\  \ \_\  \ \_____\  \ \_\ \_\     \ \_\    \/\_____\  \ \__|    \ \_____\  \/\_____\ 
  \/_/\/_/   \/_/   \/_____/   \/_/\/_/      \/_/     \/_____/   \/_/      \/_____/   \/_____/ 
                                                                                               
*/

$(function () {
  'use strict';

  var current = 0;
  var route = [
    Fyve.Views.welcome,
    Fyve.Views.chooseYourFyve,
    Fyve.Views.soAlone,
    Fyve.Views.readyTofyve,
    Fyve.Views.niceBro,
    Fyve.Views.rateHighFyve
  ];
  var wrapper = $('#high-fyve-container');
  var transitionDuration = parseInt(wrapper.css('transitionDuration').replace(/0.|s|,/g, '').charAt(0), 10) * 100;
  var loggedIn = false;
  var userToken;

  // Bring in the welcome screen.
  changeState(Fyve.Views.welcome);

  Fyve.changeState = changeState;

  function hideContent () {
    wrapper.css({
      transform: 'scale(.8)',
      opacity: 0,
      pointerEvents: 'none'
    });
  }

  function showContent () {
    wrapper.css({
      transform: 'scale(1)',
      opacity: 1,
      pointerEvents: 'auto'
    });
  }

  function changeState (view, args) {
    if (!window.view && !view) {
      console.error('WTF, bro. ' + view + ' does not exist.');
      return false;
    }

    var markup = view();

    hideContent();
    setTimeout(function () {
      wrapper.html(markup);
      bindUI();
      showContent();
    }, transitionDuration + 400);
  }

  function bindUI () {
    var next = $('[data-next]');

      $('[data-success]').click(function () {
        Fyve.success = this.getAttribute('data-success');
        console.log(userToken);

        if (Fyve.success == "true") {
          $.ajax({
            type: 'POST',
            url: '/successawesome',
            data: {
              token: userToken
            },
            success: function (response) {
              console.log(response);
            }
          });
        } else {
          $.ajax({
            type: 'POST',
            url: '/bail',
            data: {
              token: userToken
            },
            success: function (response) {
              console.log(response);
            }
          });
        }
      });

    next.on('click', function () {
      if (this.getAttribute('data-next') === 'false') {
        current = 1;
      } else {
        current++;
      }

      if (this.getAttribute('data-role')) {
        Fyve.role = this.getAttribute('data-role');
      }

      changeState(route[current]);
    });

    if ($('.login-container').length > 0) {
      $('.submit').on('click', function (e) {
        var userData = {
          username: $('.username').val(),
          password: $('.password').val(),
          photo: $('.photo').val()
        };

        $.ajax({
          type: 'POST',
          data: userData,
          url: '/login',
          success: function (response) {
            if (response.token) {
              userToken = response.token;
              current++;
              changeState(route[current]);
            }
          }
        });
      });
    }

    var roles = $('[data-role]');
    if (roles.length > 0) {
      roles.click(function () {
        current++;
        changeState(route[current]);

        Fyve.role = this.getAttribute('data-role');
        var request;
        var interval;
        var user;

        if (Fyve.role == 'fivee') {
          request = '/fivee';
        } else {
          request = '/fiver';
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position){
            user = {
              token: userToken,
              lat: '' + position.coords.latitude,
              lng: '' + position.coords.longitude
            };

            var success = function (response) {
              clearInterval(interval);
              Fyve.partner = response;
              Fyve.me = user;
              current++;
              changeState(route[current]);

              var interval2 = setInterval(function () {
                $.ajax({
                  type: 'GET',
                  url: '/status?token=' + userToken,
                  success: function (response) {
                    if (response.status == 'matched') {
                      return false;
                    }

                    if (response.status == 'cancelled') {
                      Fyve.success = 'false';
                    } else {
                      Fyve.success = 'true';
                    }

                    clearInterval(interval2);

                    current++;
                    changeState(route[current]);
                  }
                });
              }, 2000);
            };

            $.ajax({
              type: 'POST',
              url: request,
              data: user,
              success: function (response) {
                if (response.username) {
                  success(response);
                } else {
                  interval = setInterval(function () {
                    $.ajax({
                      type: 'GET',
                      url: request,
                      data: {
                        token: userToken
                      },
                      success: function (response) {
                        if (response.username) {
                          success(response);
                        }
                      }
                    });
                  }, 1000);
                }
              }
            });
          });
        } else {
          console.error('screw you, your browser sucks.');
        }
      });
    }

    animations();

    if (current == 4) {
      setTimeout(function () {
        current++;
        changeState(Fyve.Views.rateHighFyve);
      }, 4000);
    }

    $('.rate-1').on('click', function(){
      console.log(this);
      $('.rate-show').removeClass('rate-show').addClass('rate-hide');
      $('#rateImgOne').addClass('rate-show');
      $('#rateButton h2').html('Weak');
    });
    $('.rate-2').on('click', function(){
      console.log(this);
      $('.rate-show').removeClass('rate-show').addClass('rate-hide');
      $('#rateImgTwo').addClass('rate-show');
      $('#rateButton h2').html('Fine');
    });
    $('.rate-3').on('click', function(){
      console.log(this);
      $('.rate-show').removeClass('rate-show').addClass('rate-hide');
      $('#rateImgThree').addClass('rate-show');
      $('#rateButton h2').html('Solid');
    });
    $('.rate-4').on('click', function(){
      console.log(this);
      $('.rate-show').removeClass('rate-show').addClass('rate-hide');
      $('#rateImgFour').addClass('rate-show');
      $('#rateButton h2').html('Awesome');
    });
    $('.rate-5').on('click', function(){
      console.log(this);
      $('.rate-show').removeClass('rate-show').addClass('rate-hide');
      $('#rateImgFive').addClass('rate-show');
      $('#rateButton h2').html('Flawless');
    });
  }



  function animations () {
    var gallery = $('.gallery');

    if (gallery.length > 0) {
      var current = 0;
      var max = 3;
      var slides = $('.slide');

      slides.eq(current).css('opacity', 1);
      var interval = setInterval(function () {
        if (current == max) {
          clearInterval(interval);
          return false;
        }

        if (current == max - 1) {
          $('.gallery').css('paddingBottom', '0');
        }

        current++;
        slides.css('opacity', 0);
        slides.eq(current).css('opacity', 1);
      }, 4000);
    }

    // Welcome screen.
    var handLeft = $('.hand-left');
    var handRight = $('.hand-right');

    if (handLeft && handRight) {
      setTimeout(function () {
        handLeft.addClass('high-five-me-bro');
        handRight.addClass('high-five-me-bro');
      }, 500);

      setTimeout(function () {
        handLeft.removeClass('high-five-me-bro');
        handRight.removeClass('high-five-me-bro');
      }, 1500);

      setTimeout(function () {
        $('.login-container').removeClass('hidden');
      }, 2500);
    }
  }

  $(window).on('beforeunload', function () {
   $.ajax({
      type: 'POST',
      url: '/bail',
      data: {
        token: userToken
      },
      success: function (response) {
        console.log(response);
      }
    });
 });
});

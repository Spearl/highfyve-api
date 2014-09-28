
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
    Fyve.Views.niceBro
  ];
  var wrapper = $('#high-fyve-container');
  var transitionDuration = parseInt(wrapper.css('transitionDuration').replace(/0.|s|,/g, '').charAt(0), 10) * 100;
  var loggedIn = false;

  // Bring in the welcome screen.
  changeState(Fyve.Views.welcome);

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
      console.error('WTF, bro. That view does not exist.');
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

    next.on('click', function () {
      if (this.getAttribute('data-next') === 'false') {
        current = 0;
      } else {
        current++;
      }

      if (this.getAttribute('data-role')) {
        Fyve.role = this.getAttribute('data-role');
      }

      if (this.getAttribute('data-success')) {
        Fyve.success = this.getAttribute('data-success');
      }

      changeState(route[current]);
    });

    animations();

    if (current == 2) {
      setTimeout(function () {
        current++;
        console.log(route[current]);
        changeState(route[current]);
      }, 2000);
    }

    if ($('.refresh') && current == 4) {
      current = 0;

      setTimeout(function () {
        changeState(route[current]);
      }, 6000);
    }
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
          $('.gallery').css('paddingBottom', '75%');
        }

        current++;
        slides.css('opacity', 0);
        slides.eq(current).css('opacity', 1);
      }, 2000);
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
});

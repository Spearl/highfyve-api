
/*
 __  __     __     ______     __  __        ______   __  __     __   __   ______     ______    
/\ \_\ \   /\ \   /\  ___\   /\ \_\ \      /\  ___\ /\ \_\ \   /\ \ / /  /\  ___\   /\  ___\   
\ \  __ \  \ \ \  \ \ \__ \  \ \  __ \     \ \  __\ \ \____ \  \ \ \'/   \ \  __\   \ \___  \  
 \ \_\ \_\  \ \_\  \ \_____\  \ \_\ \_\     \ \_\    \/\_____\  \ \__|    \ \_____\  \/\_____\ 
  \/_/\/_/   \/_/   \/_____/   \/_/\/_/      \/_/     \/_____/   \/_/      \/_____/   \/_____/ 
                                                                                               
*/
                                                                                    
if (!window.Fyve) {
  Fyve = {};
}

Fyve.Views = {};

/*
  Welcome Screen
  ==============

  Detects whether or not the user
  is logged in and forwards them
  to either the signup/login screen
  or the chooseYourFyve screen.
*/
Fyve.Views.welcome = function () {
  return (
    '<div class="welcome-container">' +
      '<div class="hand-right"><img src="static/assets/intro-right.png"></div>' +
      '<div class="hand-left"><img src="static/assets/intro-left.png"></div>' +
      '<div class="login-container hidden">' +
        '<div class="logo"><img src="static/assets/logo-stacked.png"></div>' +
        '<form id="login-form">' +
          '<input type="text" placeholder="username" class="username">' +
          '<input type="password" placeholder="password" class="password">' +
          '<input type="text" placeholder="http://www.site.com/photo.jpg" class="photo">' +
          '<div class="button enter submit">' +
            '<div class="button-inner yellow"><h2>Login</h2></div>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>'
  );
};


/*
  Choose Your Fyve
  ================

  Choose whether you want to take
  on the role of the fyver or the
  fyvee.
*/
Fyve.Views.chooseYourFyve = function () {
  return (
    '<div class="fivee">' +
      '<h1>Fyvee</h1>' +
      '<p>Receive an epic<br>high five!</p>' +
      '<div class="hand"><img src="static/assets/intro-right.png"></div>' +
      '<div class="button" data-role="fivee"><div class="button-inner yellow"><h2>Go</h2></div></div>' +
    '</div>' +
    '<div class="fiver">' +
      '<h1>Fyver</h1>' +
      "<p>Go give the world's<br>most epic high five!</p>" +
      '<div class="hand"><img src="static/assets/intro-left.png"></div>' +
      '<div class="button" data-role="fiver"><div class="button-inner orange"><h2>Go</h2></div></div>' +
    '</div>'
  );
};


/*
  So Alone
  ========

  You haven't been paired up with
  anyone just yet. Hang on for a
  high fyve.
*/
Fyve.Views.soAlone = function () {
  return '<div class="waiting centered"><div class="hand"><img src="static/assets/hand-default-outline.png"></div><div class="gradient"></div><img src="static/assets/waiting-blue.png"></div></div>';
};


/*
  Ready to fyve
  =============

  You've been paired with another
  highFyves user. Get ready to
  give a High Fyve. This screen
  will be different depending on
  whether you're the fyver or 
  fyvee.

  This view has buttons for 
  "Fyve Complete" or "Got Left
  Hanging." One of those buttons
  will forward you to the next screen.

  @param fyveRole accepts either
    "fyver" or "fyvee".
*/
Fyve.Views.readyTofyve = function (fyveRole) {
  if (Fyve.role == 'fivee') {
    return (
      '<div class="user-wrapper">' +
        '<h2>@foleyatwork</h2>' +
        '<p>300ft away. Stay put and wait to be high fived.</p>' +
        '<div class="gallery">' +
          '<div class="slide"><img src="static/assets/protip-stand-up.png"></div>' +
          '<div class="slide"><img src="static/assets/protip-arm-up.png"></div>' +
          '<div class="slide"><img src="static/assets/protip-smile.png?v2"></div>' +
          '<div class="slide"><img src="static/assets/map.png"></div>' +
        '</div>' +
        '<div class="button" data-next="true" data-success="true"><div class="button-inner yellow"><h2>Nice, Bro!</h2></div></div>' +
        '<div class="button" data-next="true" data-success="false"><div class="button-inner orange"><h2>Left me Hanging</h2></div></div>' +
      '</div>'
    );
  } else {
    console.log('yuno');
      '<div class="user-wrapper">' +
        '<h2>@thefatling</h2>' +
        '<p>300ft away.</p>' +
        '<h3>Stay put. Your high five is on the way.</h3>' +
        '<div class="button" data-next="true" data-success="true"><div class="button-inner yellow"><h2>Nice, Bro!</h2></div></div>' +
        '<div class="button" data-next="true" data-success="false"><div class="button-inner orange"><h2>Left me Hanging</h2></div></div>' +
      '</div>'
  }
};

/*
  Nice (or not so nice) Bro
  =========================

  This High Fyve transaction is
  complete. You either executed the
  high fyve or you got left hanging.
  Now it's time to review your 
  fyve partner.
*/

Fyve.Views.niceBro = function () {
  if (Fyve.success === "true") {
    return (
      '<h1 class="confirmation">Sweet!</h1>' +
      '<div class="refresh"></div>' +
      '<div class="flaming-hand"><img src="static/assets/chrushed-it.gif"></div>'
    );
  } else {
    return (
      '<h1 class="confirmation">Lame, dude.</h1>' +
      '<div class="refresh"></div>' +
      '<div class="flaming-hand"><img src="static/assets/left-hanging.gif"></div>'
    );
  }
}

/*
  Rate my dick pic
  ================

*/

Fyve.Views.rateHighFyve = function () {
  return (
    // '<h1 class="rate-title">Rate your Fyve</h1>' + 
    //   '<div><ul class="rating-list">' +
    //     '<li class="rate-flawless"><div class="button"><div class="button-inner white"><h2>Flawless</h2></div></div></li>' +
    //     '<li class="rate-awesome"><div class="button"><div class="button-inner orange"><h2>Awesome</h2></div></div></li>' +
    //     '<li class="rate-solid"><div class="button"><div class="button-inner yellow"><h2>Solid</h2></div></div></li>' +
    //     '<li class="rate-fine"><div class="button"><div class="button-inner purple"><h2>Fine</h2></div></div></li>' +
    //     '<li class="rate-weak"><div class="button"><div class="button-inner blue"><h2>Weak</h2></div></div></li>' +
    // '</ul></div>'

    '<h1 class="rate-title">Rate your Fyve</h1>' +
      '<div class="rate-container">' +
        '<div class="rate–show">' + 
          '<img src="../assets/3hand.gif">' +  
        '</div>' + 
        '<div class="rate-hide">' + 
          '<img src="../assets/3hand.gif">' +  
        '</div>' + 
        '<div class="rate–hide">' + 
          '<img src="../assets/3hand.gif">' +  
        '</div>' + 
        '<div class="rate–hide">' + 
          '<img src="../assets/3hand.gif">' +  
        '</div>' + 
        '<div class="rate–hide">' + 
          '<img src="../assets/3hand.gif">' +  
        '</div>' + 
        '<div class="rate-numbers">' + 
          '<div class="rate-1"></div>' + 
          '<div class="rate-2"></div>' + 
          '<div class="rate-3"></div>' + 
          '<div class="rate-4"></div>' + 
          '<div class-"rate-5"></div>' + 
        '</div>' +
      '</div>' 
  );
}


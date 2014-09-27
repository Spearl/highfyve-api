/*
 __  __     __     ______     __  __        ______   __  __     __   __   ______    
/\ \_\ \   /\ \   /\  ___\   /\ \_\ \      /\  ___\ /\ \_\ \   /\ \ / /  /\  ___\   
\ \  __ \  \ \ \  \ \ \__ \  \ \  __ \     \ \  __\ \ \____ \  \ \ \'/   \ \  __\   
 \ \_\ \_\  \ \_\  \ \_____\  \ \_\ \_\     \ \_\    \/\_____\  \ \__|    \ \_____\ 
  \/_/\/_/   \/_/   \/_____/   \/_/\/_/      \/_/     \/_____/   \/_/      \/_____/ 
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
  return '<h1>Welcome</h1>';
};


/*
  Choose Your Fyve
  ================

  Choose whether you want to take
  on the role of the fyver or the
  fyvee.
*/
Fyve.Views.chooseYourFyve = function () {
  return '<h1>Choose Your Fyve</h1>';
};


/*
  So Alone
  ========

  You haven't been paired up with
  anyone just yet. Hang on for a
  high fyve.
*/
Fyve.Views.soAlone = function () {
  return '<h1>So Alone</h1>';
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
  return '<h1>Ready to Five</h1>';
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
  return '<h1>Nice Bro</h1>';
}

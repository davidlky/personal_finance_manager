var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , Config = require("./../../config");

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  if (id == Config.username){
    done(null, {username: Config.username, password: Config.password})
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username != Config.username || password != Config.password) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, {username: username, password: password});
  }));

module.exports = passport;
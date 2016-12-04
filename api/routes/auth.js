var router = require('express').Router();
var passport = require('passport');

router.get('/check', function(req,res){
    if (req.isAuthenticated()){
        res.send(true);
    }else{
        res.send(false);
    }
});

router.post('/login',
    passport.authenticate('local', 
        { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true 
        })
);

module.exports = router;
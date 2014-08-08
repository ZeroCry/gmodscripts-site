var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', passport.authenticate('steam', { failureRedirect: '/login' }),
  	function(req, res) {
    	res.redirect('/');
	}
);

module.exports = router;

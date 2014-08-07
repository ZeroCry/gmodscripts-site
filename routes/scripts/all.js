var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('scripts', { title: "Script Listings" });
});

module.exports = router;
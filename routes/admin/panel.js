var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('administration', { title: "Administration Panel" });
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sp', function(req, res, next) {
  res.render('sp', { title: 'SmartPhone' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/video', function(req, res, next) {
    //User-Agentの取得
    //console.log("ua is "+JSON.stringify(req.headers['user-agent']));
    res.render('video', { title: 'GuideLine', ua: JSON.stringify(req.headers['user-agent']) });
});

module.exports = router;

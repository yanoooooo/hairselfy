var express = require('express');
var url     = require('url');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hair Selfy' });
});

router.get('/video', function(req, res, next) {
    //User-Agentの取得
    //console.log("ua is "+JSON.stringify(req.headers['user-agent']));
    //android needs room id
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    //console.dir(query);
    res.render('video', { title: 'GuideLine', ua: JSON.stringify(req.headers['user-agent']), room_id: query.id });
});

module.exports = router;

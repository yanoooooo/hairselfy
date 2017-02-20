var express = require('express');
var url     = require('url');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hair Selfy' });
});

router.get('/select', function(req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var title = "";
    if(query.mode == "free") {
        title = "Free mode";
    } else {
        title = "Template mode";
    }
    res.render('select', { title: title, mode: query.mode });
});

router.get('/guideline', function(req, res, next) {
    //User-Agentの取得
    //console.log("ua is "+JSON.stringify(req.headers['user-agent']));
    //android needs room id
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    //console.dir(query);
    res.render('guideline', { title: 'GuideLine', ua: JSON.stringify(req.headers['user-agent']), room_id: query.id, datas: []});
});

router.post('/guideline', function(req, res, next) {
    //User-Agentの取得
    //console.log("ua is "+JSON.stringify(req.headers['user-agent']));
    //android needs room id
    console.dir(req.body);
    res.render('guideline', { title: 'GuideLine', ua: JSON.stringify(req.headers['user-agent']), room_id: "", datas: req.body.datas});
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.cookies.user == null) {
    res.redirect('/signin');
  } else {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;

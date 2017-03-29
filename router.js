var express = require('express');

var router = express.Router();
var login = require('./routes/login');
var upload = require('./routes/upload');

router.get('/', function(req, res) {
	res.send('<img src="127.0.0.1:8080/files/dmZq9tGX7ndLHv2FPct_jjmv.png">');
})
router.post('/login', login.loginIn);
router.post('/signup', login.signUp);
router.post('/modifyPass', login.modifyPass);
router.get('/getUsers', login.getUsers);
router.post('/deleteUser', login.delete);

router.post('/upload', upload.imgUpload);
router.get('/upload', upload.img);

module.exports = router;
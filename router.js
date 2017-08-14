var express = require('express');

var router = express.Router();
var login = require('./routes/login');
var upload = require('./routes/upload');
var production = require('./routes/production');
var link = require('./routes/link');
var gallery = require('./routes/gallery')

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

router.post('/setCarousel', upload.setCarousel); //后台上传轮播图
router.get('/getCarousel', upload.getCarousel);  //get轮播图

router.post('/setProduction', production.setProduction)  //上传产品
router.get('/getProduction', production.getProduction)

router.get('/getLinkData', link.getLinkData)
router.post('/addLink', link.addLink)
router.post('/modifyLink', link.modifyLink)
router.get('/delLink', link.delLink)

router.get('/getGallery', gallery.getGallery)
router.post('/addGallery', gallery.addGallery)
router.get('/delGallery', gallery.delGallery)
router.get('/modifyGallery', gallery.modifyGallery)
router.post('/addMainStage', gallery.addMainStage)

module.exports = router;
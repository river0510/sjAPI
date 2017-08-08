var multiparty = require('multiparty');
var fs = require('fs');
var config = require('../config');
var models = require('../models');
var Carousel = models.carousel;

//type 上传类型 {carousel 轮播图上传  gallery 体验馆上传}
exports.imgUpload = function(req, res) {
	var uploadType = req.query.type;
	var form = new multiparty.Form({
		uploadDir: './public/' + uploadType + '/'
	});
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);
		var relPath = [];
		if (err) {
			// 保存失败 
			console.log('Parse error: ' + err);
			res.json({
				status: 'fail'
			});
		} else {
			// 图片保存成功！
			console.log('Parse Files: ' + filesTmp);
			files.file.forEach(function(value, index) {
				relPath[index] = config.host + value.path.substr(7);
			})
			res.json({
				'data': {
					'image_src': relPath
				},
				status: 'success'
			})
		}
	});
}

exports.setCarousel = function(req, res) {
	let carousel = req.body.carousel;
	carousel = carousel.split(',');
		console.log(carousel);
	Carousel.remove({},(err)=>{
		console.log('remove')
	});
	let newCarousel = new Carousel({carousel: carousel});
	newCarousel.save((err)=>{
		let data = {};
		if(err){
			data.status = 400;
			data.message = '上传失败'
		}else{
			data.status = 200;
			data.message = '上传成功'
		}

		res.json(data);
	})
}

exports.getCarousel = function(req, res){
	let data = {};
	Carousel.findOne({},(err, carousel)=>{
		if(err){
			data.status = 400;
		} else{
			data.status = 200;
			data.carousel =  carousel && carousel.carousel;
		}
		
		res.json(data);
	})
}

exports.img = function(req, res) {
	res.render('img');
}
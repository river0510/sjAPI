var multiparty = require('multiparty');
var fs = require('fs');
var config = require('../config');

exports.imgUpload = function(req, res) {
	var form = new multiparty.Form({
		uploadDir: './public/files/'
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

exports.img = function(req, res) {
	res.render('img');
}
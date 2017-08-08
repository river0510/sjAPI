var multiparty = require('multiparty');
var fs = require('fs');
var config = require('../config');
var models = require('../models');
var Production = models.production;

//type 上传类型 {carousel 轮播图上传  gallery 体验馆上传}
exports.setProduction = function(req, res) {
	let imgUrl = req.body.imgUrl,
		introduce_CN = req.body.introduce_CN,
		introduce_EN = req.body.introduce_EN,
		_id = req.body._id;
	let production = {
		imgUrl,
		introduce_EN,
		introduce_CN
	}
	console.log('production',production);
	Production.update({_id},production,(err)=>{
		let data = {};
		if(err){
			data = {
				status : 400,
				message : '修改失败'
			}
			console.log(err);
		}else{
			data = {
				status : 200,
				message : '修改成功'
			}
		}
		res.json(data);
	})
}

exports.getProduction = function(req, res) {
	let _id = req.query._id;
	let data = {};
	if(_id){
		Production.findOne({_id},(err,production)=>{
			if(err){
				data = {
					status: 400
				}
			}else{
				data = {
					status: 200,
					production: production
				}
			}
			res.json(data)
		})		
	}else{
		Production.find({},(err,production)=>{
			if(err){
				data = {
					status: 400
				}
			}else{
				data = {
					status: 200,
					production: production
				}
			}
			res.json(data)
		})
	}

}

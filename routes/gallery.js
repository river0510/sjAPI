var multiparty = require('multiparty');
var fs = require('fs');
var config = require('../config');
var models = require('../models');
var Gallery = models.gallery;

exports.getGallery = function(req, res) {
	let mainStageId = req.query.mainStageId,
		subMenuId = req.query.subMenuId;
	Gallery.find({mainStageId, subMenuId}, (err, gallery)=>{
		let data = {};
		if(err){
			data = {
				status: 400
			}
			res.json(data);
		}
		data = {
			status: 200,
			gallery: gallery
		}
		res.json(data);
	})
}

exports.addGallery = function(req, res) {
	let {mainStageId, subMenuId, thumbnail, stageImg, hoverStageImg, commodityId} = req.body;
	let data = {};
	if(!mainStageId || !subMenuId || !thumbnail || !stageImg || !hoverStageImg){
		data = {
			status: 400,
			message: '不能为空'
		}
	}



	let gallery = new Gallery({mainStageId, subMenuId, thumbnail, stageImg, hoverStageImg, commodityId});
	gallery.save((err)=>{
		if(err){
			data = {
				status: 400,
				message: '添加失败'
			}
			res.json(data)
		}

		data = {
			status: 200,
			message: '添加成功'
		}
		res.json(data)
	})

}

exports.modifyGallery = function(req, res) {
	let {_id, thumbnail, stageImg, commodityId} = req.body;
	let data = {};
	if(!mainStageId || !subMenuId || !thumbnail || !stageImg){
		data = {
			status: 400,
			message: '不能为空'
		}
	}

	Gallery.update({_id},{thumbnail, stageImg, hoverStageImg, commodityId}, (err)=>{
		if(err){
			data = {
				status: 400,
				message: '修改失败'
			}
		}else{
			data = {
				status: 200,
				message: '修改成功'
			}
		}
		res.json(data)
	})
}

exports.delGallery = function(req, res) {
	let _id = req.query._id;
	Gallery.remove({_id},(err)=>{
		if(err){
			data = {
				status: 400,
				message: '删除失败'
			}
		}else{
			data = {
				status: 200,
				message: '删除成功'
			}
		}
		res.json(data)
	})
}

exports.addMainStage = function(req, res){
	let {stageImg, mainStageId} = req.body;
	console.log({stageImg, mainStageId})
	let data = {};
	if(!stageImg){
		data = {
			status: 400,
			message: '不能为空'
		}
	}

	Gallery.findOne({mainStageId,subMenuId: -1},(err, mainStage)=>{
		if(err){
			data = {
				status: 400,
				message: '添加失败'
			}
			res.json(data);
		}
		if(!mainStage){
			Gallery.create({mainStageId, subMenuId: -1, stageImg},(err)=>{
				if(err){
					data = {
						status: 400,
						message: '添加失败'
					}
				}else{
					data = {
						status: 200,
						message: '添加成功'
					}
				}
				res.json(data);
			})
		}else{
			Gallery.update({_id: mainStage._id},{stageImg},(err)=>{
				if(err){
					data = {
						status: 400,
						message: '添加失败'
					}
				}else{
					data = {
						status: 200,
						message: '添加成功'
					}
				}
				res.json(data);
			})
		}
	})
}
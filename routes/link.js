var multiparty = require('multiparty');
var fs = require('fs');
var config = require('../config');
var models = require('../models');
var Link = models.link;

exports.getLinkData = function(req, res) {
	let parentKey = req.query.key;
	Link.findOne({parentKey},(err,link)=>{
		let data = {};
		if(err){
			data = {
				status: 400,
				message: '数据查询失败'
			}
		}else{
			data = {
				status: 200,
				message: '数据查询成功',
				linkData: link && link.linkData
			}
		}
		res.json(data);
	})
}

exports.addLink = function(req, res){
	let {linkName_CN, linkName_EN, linkURL,selectedKey} = req.body;
	let newLink = {
		linkName_CN,
		linkName_EN,
		linkURL
	};
	Link.findOne({parentKey: selectedKey},(err,link)=>{
		let data = {};
		if(err){
			data={
				status: 400,
				message: '添加失败'
			}
			res.json(data);
		}
		newLink.linkId = link.linkData.length;
		link.linkData.push(newLink);
		Link.update({parentKey: selectedKey},{linkData: link.linkData},(err)=>{
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
	})
}

exports.modifyLink = function(req, res){
	let {linkName_CN, linkName_EN, linkURL, linkId, selectedKey} = req.body;
	let newLink = {
		linkName_CN,
		linkName_EN,
		linkURL,
		linkId
	};
	Link.findOne({parentKey: selectedKey},(err,link)=>{
		let data = {};
		if(err){
			data={
				status: 400,
				message: '修改失败'
			}
			res.json(data);
		}
		
		link.linkData[linkId] = newLink;
		Link.update({parentKey: selectedKey},{linkData: link.linkData},(err)=>{
			if(err){
				data = {
					status: 400,
					message: '修改失败'
				}
				res.json(data)
			}
			data = {
				status: 200,
				message: '修改成功'
			}
			res.json(data)
		})
	})
}

exports.delLink = function(req, res){
	let {linkId, key} = req.query;
	console.log(linkId, key);
	Link.findOne({parentKey: key},(err,link)=>{
		let data = {};
		if(err){
			data={
				status: 400,
				message: '修改失败'
			}
			res.json(data);
		}

		link.linkData.splice(linkId,1);
		let newLink = link.linkData.map((value,index)=>{value.linkId = index; return value});
		Link.update({parentKey: key},{linkData: newLink},(err)=>{
			if(err){
				data = {
					status: 400,
					message: '删除失败'
				}
				res.json(data)
			}
			data = {
				status: 200,
				message: '删除成功'
			}
			res.json(data)
		})
	})
}

var models = require('../models');
var User = models.user;

exports.loginIn = function(req, res) {
	var userName = req.body.userName;
	var password = req.body.password;
	var data = {};
	User.findOne({
		'userName': userName
	}, (err, user) => {
		if (err) {
			data.status = 400;
			data.message = "连接失败，请稍后再试";
			res.json(data);
		} else {
			if (user) {
				console.log(user.password);
				if (user.password === password) {
					data.status = 200;
					data.message = "登陆成功";
					data.user = {
						userName: user.userName,
						role: user.role,
						id: user._id
					}
					console.log(data);
					res.json(data);
				} else {
					data.status = 401;
					data.message = "密码错误";
					console.log(data);
					res.json(data);
				}
			} else {
				data.status = 402;
				data.message = "账户名不存在";
				console.log(data);
				res.json(data);
			}
		}
	})
}

exports.signUp = function(req, res) {
	var userName = req.body.userName;
	var password = req.body.password;
	var role = req.body.role;
	console.log(userName + ' ' + password + ' ' + role);
	var data = {};
	User.findOne({
		'userName': userName
	}, (err, user) => {
		console.log(user);
		if (err) {
			data.status = 400;
			data.message = "连接失败，请稍后再试";
			res.json(data);
		} else if (user) {
			data.status = 401;
			data.message = "用户名已存在";
			res.json(data);
		} else {
			var newUser = new User({
				userName: userName,
				password: password,
				role: role
			});
			newUser.save((err) => {
				if (err) {
					data.status = 402;
					data.message = "注册失败，请稍后再试";
					res.json(data);
				} else {
					data.status = 200;
					data.message = "注册成功";
					res.json(data);
				}
			})
		}
	})
}

exports.modifyPass = function(req, res) {
	var id = req.body.id;
	var password = req.body.password;
	console.log(id + ' ' + password);
	var data = {};
	User.update({
		'_id': id
	}, {
		'password': password
	}, (err) => {
		if (err) {
			data.status = 400;
			data.message = "修改失败请稍后再试";
			res.json(data);
		} else {
			data.status = 200;
			data.message = "修改成功，请重新登录";
			res.json(data);
		}
	})
}
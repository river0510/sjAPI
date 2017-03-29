var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
	userName: {
		type: String
	},
	password: {
		type: String
	},
	role: {
		type: Number,
		default: 0 //0超级管理员 1一般管理员
	}
});
mongoose.model('user', userSchema);
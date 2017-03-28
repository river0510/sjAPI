var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
	userName: {
		type: String
	},
	password: {
		type: String
	}
});
mongoose.model('user', userSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var carouselSchema = new Schema({
	picName: {
		type: String
	},
	url: {
		type: String
	}
});
mongoose.model('user', userSchema);
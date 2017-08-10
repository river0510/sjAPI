var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var linkSchema = new Schema({
	parentKey: {
		type: Number
	},
	linkData: []
});
mongoose.model('link', linkSchema);
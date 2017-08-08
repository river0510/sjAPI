var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var carouselSchema = new Schema({
	carousel: {
		type: Array
	}
});
mongoose.model('carousel', carouselSchema);
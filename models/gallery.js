var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var gallerySchema = new Schema({
	mainStageId: Number,     //0 客厅， 1 卧室
	subMenuId: Number,
	thumbnail: String,
	stageImg: String,
	hoverStageImg: String,
	commodityId: ObjectId
});
mongoose.model('gallery', gallerySchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var productionSchema = new Schema({
	imgUrl: {
		type: String
	},
	introduce_CN: {
		type: String
	},
	introduce_EN: {
		type: String
	}
});
mongoose.model('production', productionSchema);
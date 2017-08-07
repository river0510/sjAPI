var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sj');

require('./user');
require('./carousel')

exports.user = mongoose.model('user');
exports.carousel = mongoose.model('carousel');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sj');

require('./user');
require('./carousel')
require('./production')
require('./link')

exports.user = mongoose.model('user');
exports.carousel = mongoose.model('carousel');
exports.production = mongoose.model('production');
exports.link = mongoose.model('link');
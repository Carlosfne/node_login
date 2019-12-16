var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	description: {
		type: String,
		index: true
	},
	responsavel: {
		type: String
	},
	status: {
		type: String
	},
	deadline: {
		type: String
	}
});

var Atividade = module.exports = mongoose.model('Atividade', UserSchema);

module.exports.getAtividadeById = function(id, callback){
	Atividade.findById(id, callback);
}

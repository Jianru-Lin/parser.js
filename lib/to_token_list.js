exports = module.exports = to_token_list

var rec_string = require('./rec/string')
var rec_white_space = require('./rec/white_space')

// 功能：将文本解析为词列
function to_token_list(text, result, error) {
	if (!text) {
		error.text = 'source text is empty'
		return false
	}

	var src = text.split('')

	var rec_list = [
		new rec('string', rec_string),
		new rec('white space', rec_white_space)
	]

	src.forEach(function(c) {
		rec_list.forEach(function(rec) {
			rec.eat(c)
		})
	})

	

	var token_list = text.split(/\s+/g).map(function(token_text) {
		return {
			text: token_text
		}
	})
	result.token_list = token_list
	return true

	function x(rec_func, done_cb) {
		return {
			rec_func: rec_func,
			token: [],
			state: {}
			rec: function(c) {
				this.rec_func(c, )
			}
		}

		function 
	}
}

function rec_class(name, func) {

}

function seq_class() {

}

seq_class.prototype.push = function(c) {

}

seq_class.prototype.end = function(c) {

}

seq_class.prototype.at = function(i) {
	
}

seq_class.prototype.is_empty = function(c) {
	
}

function state_class() {

}

state_class.prototype.is = function(v) {

}

state_class.prototype.set = function(v) {

}

state_class.prototype.clear = function() {

}
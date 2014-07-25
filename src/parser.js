exports = module.exports = parser

var to_token_list = require('./lib/to_token_list')

function parser(lang) {

	// support javascript only now

	if (!/^javascript$/.test(lang)) {
		throw new Error('unknown language')
	}

	return new JavascriptParser()
}

function JavascriptParser() {

}

JavascriptParser.prototype.parse = function(text) {
	return to_token_list(text)
}
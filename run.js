var fs = require('fs')
var parse = require('./lib/parse')

var input = fs.readFileSync('input.js', {encoding: 'utf8'})
console.log('read input.js done.')

parse(input, parse_success, parse_failure);

function parse_success(root) {
	var text = JSON.stringify(root, null, 4)
	fs.writeFileSync('output.json', text, {encoding: 'utf8'})
	console.log('write output.json done.')
}

function parse_failure(error) {
	console.log('parse failed, ' + error.text);
}

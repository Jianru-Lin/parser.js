var fs = require('fs')
var parser = require('../src/parser')('javascript')

var text = load_text('input/demo.js')

try {
	var ast = parser.parse(text)
}
catch (err) {
	console.log(err)
	return
}

save_text('output/demo-ast.json', obj_to_text(ast))
console.log('done.')

function load_text(name) {
	return fs.readFileSync(name, {encoding: 'utf8'})
}

function save_text(name, content) {
	fs.writeFileSync(name, content, {encoding: 'utf8'})
}

function obj_to_text(obj) {
	return JSON.stringify(obj, null, 4)
}
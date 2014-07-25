exports = module.exports = function (c, token, state) {

	if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
		token.push(c)
	}
	else if (!token.is_empty()) {
		token.end()
	}
}
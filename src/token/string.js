exports = module.exports = function (c, token, state) {
	
	if (state.is(undefined)) {
		if (c === '"' || c === "'") {debugger
			state.set('body')
			token.push(c)
		}
	}

	else {

		// TODO 处理转义字符的问题

		if (c === token.at(0)) {
			token.end(c)
			state.clear()
		}
		else {
			token.push(c)
		}
	}

}
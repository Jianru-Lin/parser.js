exports = module.exports = rec_string


function rec_string(c, seq, state) {
	
	if (state.is(undefined)) {
		if (c === '"' || c === "'") {
			state.set('body')
			seq.push(c)
		}
	}

	else {

		// TODO 处理转义字符的问题

		if (c === seq.at(0)) {
			seq.end(c)
			state.clear()
		}
		else {
			seq.push(c)
		}
	}

}
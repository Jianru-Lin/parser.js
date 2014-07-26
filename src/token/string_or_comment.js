exports = module.exports = function (c, token, state) {
	
	if (state.is(undefined)) {
		if (c === '"' || c === "'") {
			state.set('string')
			token.push(c)
		}
		else if (c === '/') {
			state.set('comment-start')
			token.push(c)
		}
	}

	else if (state.is('string')) {

		// TODO 处理转义字符的问题

		if (c === token.at(0)) {
			token.end(c, 'string')
			state.clear()
		}
		else {
			token.push(c)
		}
	}

	else if (state.is('comment-start')) {
		if (c === '/') {
			state.set('single-line-comment')
			token.push(c)
		}
		else if (c === '*') {
			state.set('multi-line-comment')
			token.push(c)
		}
		else {
			// 看来这不是注释，丢掉刚开始吃入的字符
			token.clear()
		}
	}

	else if (state.is('single-line-comment')) {
		if (c === '\n') {
			state.clear()
			token.end(c, 'comment')
		}
		else {
			token.push(c)
		}
	}

	else if (state.is('multi-line-comment')) {
		if (c === '*') {
			state.set('multi-line-comment-end')
			token.push(c)
		}
		else {
			token.push(c)
		}
	}

	else if (state.is('multi-line-comment-end')) {
		if (c === '*') {
			token.push(c)
		}
		else if (c === '/') {
			state.clear()
			token.end(c, 'comment')
		}
		else {
			state.set('multi-line-comment')
			token.push(c)
		}
	}

}
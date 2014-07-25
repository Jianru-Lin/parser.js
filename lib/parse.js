exports = module.exports = parse

var to_token_list = require('./to_token_list')

function parse(text, scb, fcb) {
	var result = {}
	var error = {}

	// 先分解为词列
	
	if (!to_token_list(text, result, error)) {
		fcb(error)
		return
	}

	// 对词列进行初步的收缩
	var token_list = result.token_list

	if (!shrink(token_list, result, error)) {
		fcb(error)
		return
	}

	scb(result.token_list)

	// [函数]

	// 功能：在此列上完成配对收缩 {} () []
	function shrink(input_token_list, result, error) {
		var head_set = ['{', '(', '[']
		var tail_set = ['}', ')', ']']

		// 为了便于调试，我们将算法分解成几个清晰度阶段
		// 这会降低一些效率，但在开发初期有助于调试

		// 首先找出所有的配对符号，并将它们出现的位置一起记录到列表里

		var head_tail_list = []

		for (var i = 0, len = input_token_list.length; i < len; ++i) {
			var token = input_token_list[i]

			var set_pos = head_set.indexOf(token.text)
			if (set_pos === -1) {
				set_pos = tail_set.indexOf(token.text)
			}
			if (set_pos !== -1) {
				head_tail_list.push([i, token])
			}
		}

		// 接下来我们将会根据列表中的记录来尝试将它们进行配对

		var stack = []
		var pair_list = []

		for (var i = 0, len = head_tail_list.length; i < len; ++i) {
			var target = head_tail_list[i]
			var target_token = target[1]

			if (head_set.indexOf(target_token.text) !== -1) {
				stack.push(target)
			}
			else {
				var current_tail = target
				var current_tail_pos = current_tail[0]
				var current_tail_token = current_tail[1]

				var current_head = stack.pop() // 注意这里可能为 undefined
				var current_head_token = current_head ? current_head[1] : undefined

				if (head_set.indexOf(current_head_token.text) !== tail_set.indexOf(current_tail_token.text)) {
					error.text = 'where is the head of tail [' + current_tail_pos + ', ' + current_tail_token.text + '] ?' 
					return false
				}

				pair_list.push([current_head, current_tail])
			}
		}

		if (stack.length > 0) {
			var current_head = stack.pop()
			var current_head_pos = current_head[0]
			var current_head_token = current_head[1]

			error.text = 'where is the tail of head [' + current_head_pos + ', ' + current_head_token.text + '] ?' 
			return false
		}

		// 最后，我们根据配对情况来分解输入的 token_list 使得其变为一种层次结构

		pair_list.forEach(function(pair) {
			var first = pair[0][0]
			var last = pair[1][0]

			input_token_list[first].deep = +1
			input_token_list[last].deep = -1
		})

		var list = []
		var stack = []

		input_token_list.forEach(function(token, i) {

			switch (token.deep) {
				case +1:
					var sub_list = [token]
					list.push(sub_list)
					stack.push(list)
					list = sub_list
					break;
				case -1:
					list.push(token)
					list = stack.pop()
					break;
				default:
					list.push(token)
			}

			delete token.action
		})

		result.token_list = list
		return true
	}
}
exports = module.exports = to_token_list

// 功能：将文本解析为词列
function to_token_list(text) {
	if (!text) {
		return []
	}

	var src = text.split('')

	// 加载识别器

	var tokenizer_list = load_tokenizer_list()

	// 完成整个识别过程

	src.forEach(function(c, pos) {
		tokenizer_list.forEach(function(tokenizer) {
			tokenizer.eat(c, pos)
		})
	})

	// 收集识别结果
	return collect_token(tokenizer_list)
}

function load_tokenizer_list() {
	var r = require
	return [
		new Tokenizer('string', r('../token/string')),
		//new Tokenizer('white_space', r('../token/white_space')),
	]
}

function collect_token(tokenizer_list) {
	var token_list = []
	tokenizer_list.forEach(function(tokenizer) {
		token_list = token_list.concat(tokenizer.get_token_list())
	})
	return token_list
}

// Tokenizer

function Tokenizer(name, func) {
	this.name = name
	this.func = func
	this.token_bucket = new TokenBucket(name)
	this.state = new State()
}

Tokenizer.prototype.eat = function(c, pos) {
	this.token_bucket.pos = pos
	this.func(c, this.token_bucket, this.state)
}

Tokenizer.prototype.get_token_list = function() {
	return this.token_bucket.token_list
}

// TokenBucket

function TokenBucket(name) {
	this.name = name
	this.pos = undefined
	this.token = undefined
	this.token_list = []
}

TokenBucket.prototype.push = function(c) {

	// token 中的 0 号元素代表了此 token 的起始位置

	if (this.token === undefined) {
		this.token = [[this.pos, this.name]]
	}

	this.token.push(c)
}

TokenBucket.prototype.end = function(c) {
	this.push(c)
	this.token_list.push(this.token)
	this.token = undefined
}

TokenBucket.prototype.at = function(i) {
	return this.token !== undefined ? this.token[i + 1] : undefined
}

TokenBucket.prototype.is_empty = function(c) {
	return this.token !== undefined ? this.token.length === 0 : true
}

// State

function State() {
	this.v = undefined
}

State.prototype.is = function(v) {
	return this.v === v
}

State.prototype.set = function(v) {
	this.v = v
}

State.prototype.clear = function() {
	this.v = undefined
}
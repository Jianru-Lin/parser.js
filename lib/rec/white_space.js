exports = module.exports = rec_string

function rec_white_space(c, seq, state) {

	if (c === ' ' || c === '\t') {
		seq.push(c)
	}
	else if (!seq.is_empty()) {
		seq.end()
	}
}
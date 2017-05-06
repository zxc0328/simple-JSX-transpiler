import Parser from './parser'
import Tokenizer from './tokenizer'

var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new Parser(code)).parse()
	console.log(astRoot)
}


export default Tokenizer
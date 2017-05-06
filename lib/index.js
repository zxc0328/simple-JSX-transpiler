import Parser from './parser'
import Tokenizer from './tokenizer'
import CodeGen from './codegen'

var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new Parser(code)).parse()
	var code = new CodeGen(astRoot)
	return code
}


export default transpiler
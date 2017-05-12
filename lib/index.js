import Parser from './parser'
import Tokenizer from './tokenizer'
import CodeGen from './codegen'

var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new Parser(code)).parse()
	var code = new CodeGen(astRoot)
	/**
	 * dev code
	 */
	// console.log(astRoot)
	// var textarea = document.querySelector("#codegen")
	// textarea.value = code.body
	return code
}


export default transpiler
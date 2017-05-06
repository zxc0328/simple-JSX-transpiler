import Parser from './parser'
import Tokenizer from './tokenizer'
import CodeGen from './codegen'

var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new Parser(code)).parse()
	var code = new CodeGen(astRoot)
	console.log(astRoot)
	console.log(code)
	var ta = document.getElementById("codegen")
	ta.value = code.body
}


export default transpiler
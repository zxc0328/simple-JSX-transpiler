/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  TK_TEXT: 1, // 文本节点
  TK_EXPR: 2, // {data}
  TK_END_IF: 3, // {/if}
  TK_GT: 4, // >
  TK_SLASH_GT: 5, // />
  TK_TAG_NAME: 6, // <div|<span|<img|...
  TK_ATTR_NAME: 7, // 属性名
  TK_ATTR_EQUAL: 8, // =
  TK_ATTR_STRING: 9, // "string"
  TK_CLOSE_TAG: 10, // </div>|</span>|</a>|...
  TK_EOF: 100 // end of file
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tokenizer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tokentypes__ = __webpack_require__(0);



var typesName = {}
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT] = "text node"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT] = ">"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT] = "/>"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME] = "open tag name"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME] = "attribute name"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL] = "="
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_STRING] = "attribute string"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EXPR] = "javascript expression"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_CLOSE_TAG] = "close tag"
typesName[__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EOF] = "EOF"

function Parser (input) {
  this.tokens = new __WEBPACK_IMPORTED_MODULE_0__tokenizer__["a" /* default */](input)
}

var pp = Parser.prototype

pp.is = function (type) {
  return (this.tokens.peekToken().type === type)
}

pp.parse = function () {
  this.tokens.index = 0
  var root = this.parseStat()
  this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EOF)
  return root
}

pp.parseProgram = function () {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)) {
    var node = pp.parseNode()
    return node
  }else {
    // error
  }
}

pp.parseStat = function () {
  var stat = {
    type: 'Stat',
    members: []
  }
  if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EXPR)
  ) {
    pushMembers(stat.members, [this.parseFrag()])
    pushMembers(stat.members, this.parseStat().members)
  } else {// TODO: Follow check
    // end
  }
  return stat
}

/*
 * push stat's memeber and concat all text
 */
function pushMembers (target, candidates) {
  for (var i = 0, len = candidates.length; i < len; i++) {
    var lasIdx = target.length - 1
    if (
      isString(target[lasIdx]) && 
      isString(candidates[i])
    ) {
      target[lasIdx] += candidates[i]
    } else {
      target.push(candidates[i])
    }
  }
}

function isString (str) {
  return typeof str === 'string'
}

pp.parseFrag = function () {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_IF)) return this.parseIfStat()
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_EACH)) return this.parseEachStat()
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)) return this.parseNode()
  else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)) {
    var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TEXT)
    return token.label
  } else {
    this.parseError('parseFrag')
  }
}

/*
 * Node -> OpenTag NodeTail
 */

pp.parseNode = function () {
  var token = this.tokens.peekToken()
  var node = {
    type: 'Node',
    name: token.label
  }
  this.parseOpenTag(node)
  this.parseNodeTail(node)
  return node
}

/*
 * OpenTag -> tagName Attrs
 */

pp.parseOpenTag = function (node) {
  this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_TAG_NAME)
  node.attributes = this.parseAttrs()
}

/*
 * NodeTail -> '>' Stat closeTag
 *           | '/>'
 */

pp.parseNodeTail = function (node) {
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT)) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT)
    node.body = this.parseStat()
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_CLOSE_TAG)
  } else if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)
  } else {
    this.parseError('parseNodeTail')
  }
}

pp.parseAttrs = function () {
  var attrs = {}
  if (this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)) {
    extend(attrs, this.parseAttr())
    extend(attrs, this.parseAttrs())
  } else if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT)
  ) {
    // do nothing
  } else {
    this.parseError('parseAttrs')
  }
  return attrs
}

pp.parseAttr = function () {
  var attr = {}
  var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)
  var value = this.parseValue()
  attr[token.label] = value
  return attr
}

pp.parseValue = function () {
  if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL)
  ) {
    this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_EQUAL)
    var token = this.eat(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_STRING)
    return token.label
  } else if (
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_SLASH_GT) ||
    this.is(__WEBPACK_IMPORTED_MODULE_1__tokentypes__["a" /* default */].TK_ATTR_NAME)
  ) {
    // do nothing
  } else {
    this.parseError('parseValue')
  }
}

pp.error = function (msg) {
  throw new Error('Parse Error: ' + msg)
}

pp.parseError = function (name) {
  var token = this.tokens.peekToken()
  this.error('in ' + name + ', unexpected token \'' + token.label + '\'')
}

pp.eat = function (type) {
  var token = this.tokens.nextToken()
  if (token.type !== type) {
    this.error('expect a(n) ' + typesName[type] + ', but got a(n) ' + typesName[token.type])
  }
  return token
}

function extend (src, dest) {
  for (var key in dest) {
    if (dest.hasOwnProperty(key)) {
      src[key] = dest[key]
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Parser);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(1);


var transpiler = {}

transpiler.transpile = function (code) {
	var astRoot = (new __WEBPACK_IMPORTED_MODULE_0__parser__["a" /* default */](code)).parse()
	console.log(astRoot)
}

/* harmony default export */ __webpack_exports__["default"] = (transpiler);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tokentypes__ = __webpack_require__(0);


function Tokenizer (input) {
  this.input = input
  this.index = 0
  this.context = null
  this.eof = false
}

var pp = Tokenizer.prototype

pp.nextToken = function () {
  this.eatSpaces()
  return (
    this.readCloseTag() ||
    this.readTagName() ||
    this.readAttrName() ||
    this.readAttrEqual() ||
    this.readAttrString() ||
    this.readExpr() ||
    this.readGT() ||
    this.readSlashGT() ||
    this.readText() ||
    this.readEOF() ||
    this.error()
  )
}

/*
 * Return next token, but keep the index untouched
 */
pp.peekToken = function () {
  var index = this.index
  var token = this.nextToken()
  this.index = index
  return token
}

/*
 * Read token one by one
 */

pp.readTagName = function () {
  if (this.char() === '<') {
    this.index++
    this.eatSpaces()
    var start = this.index
    while (this.char().match(/[\w\d]/)) {
      this.index++
    }
    var tagName = this.input.slice(start, this.index)
    this.setContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME)
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME,
      label: tagName
    }
  }
}

pp.readAttrName = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && this.char()) {
    var reg = /[\w\-\d]/
    if (!reg.test(this.char())) return
    var start = this.index
    while (this.char() && reg.test(this.char())) {
      this.index++
    }
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_NAME,
      label: this.input.slice(start, this.index)
    }
  }
}

pp.readAttrEqual = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && this.char() === '=') {
    this.index++
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_EQUAL,
      label: '='
    }
  }
}

pp.readAttrString = function () {
  if (this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME) && /['"]/.test(this.char())) {
    var quote = this.char()
    var start = this.index
    this.index++
    while (!isUndefined(this.char()) && this.char() !== quote) {
      this.index++
    }
    this.index++
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_ATTR_STRING,
      label: this.input.slice(start + 1, this.index - 1)
    }
  }
}

pp.readCloseTag = function () {
  return this.captureByRegx(
    /^\<\s*?\/\s*?[\w\d-]+?\s*?\>/, 
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_CLOSE_TAG
  )
}

pp.readGT = function () {
  if (this.char() === '>') {
    this.index++
    this.setContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_GT)
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_GT,
      label: '>'
    }
  }
}

pp.readSlashGT = function () {
  return this.captureByRegx(
    /^\/\>/,
    __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_SLASH_GT
  )
}

pp.readExpr = function () {
  var input = this.input.slice(this.index)
  var capture = input.match(/\{([\s\S])+\}/)
  if (capture) {
    capture = capture[0]
    this.index += capture.length
    return {
      type: type,
      label: capture[1]
    }
  }
}


pp.readText = function () {
  if (!this.inContext(__WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TAG_NAME)) {
    var start = this.index
    if (!this.char()) return
    this.index++
    while (
      this.char() && !(/[\<\{]/.test(this.char()))
    ) {
      this.index++
    }
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_TEXT,
      label: this.input.slice(start, this.index)
    }
  }
}

pp.readEOF = function () {
  if (this.index >= this.input.length) {
    this.eof = true
    return {
      type: __WEBPACK_IMPORTED_MODULE_0__tokentypes__["a" /* default */].TK_EOF,
      label: '$'
    }
  }
}

/* 
 * Helpers Functions
 */

pp.eatSpaces = function () {
  while (/\s/.test(this.char())) {
    this.index++
  }
}

pp.setContext = function (type) {
  this.context = type
}

pp.inContext = function (type) {
  return this.context === type
}

pp.char = function () {
  return this.input[this.index]
}

pp.captureByRegx = function (regx, type) {
  var input = this.input.slice(this.index)
  var capture = input.match(regx)
  if (capture) {
    capture = capture[0]
    this.index += capture.length
    this.setContext(type)
    return {
      type: type,
      label: capture
    }
  }
}

pp.test = function () {
  while(!this.eof) {
    console.log(this.nextToken())
  }
}

pp.error = function () {
  throw new Error('Unexpected token: \'' + this.char() + '\'')
}

function isUndefined (value) {
  return value === void 666
}

/* harmony default export */ __webpack_exports__["a"] = (Tokenizer);

/***/ })
/******/ ]);
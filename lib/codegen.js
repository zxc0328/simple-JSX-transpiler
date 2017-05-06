import _ from './util'
var codeGenMethods = {}

function CodeGen (astRoot) {
  this.nodeIndex = 1
  this.lines = []
  this.walkRoot(astRoot)
  this.body = this.lines.join('\n');
}

var pp = CodeGen.prototype

pp.walkRoot = function (astRoot) {
  this.walk(astRoot, '  ', '0', true)
}

pp.walk = function (node, indent, parentIndex, initFlag) {
  if (typeof node === 'string') {
    this.lines.push(",")
    return this.genString(node, indent, parentIndex)
  } else if(node.type === "Node") {
    return this.genNode(node, indent, parentIndex, initFlag)
  } else {
    return this['gen' + node.type](node, indent, parentIndex)
  }
}

pp.walkExpr = function (node) {
  if (typeof node === 'string') {
    return node
  } else {
    return this.genNodeOneLiner(node, " ", 0)
  }
}

pp.genStat = function (node, indent, parentIndex) {
  var self = this
  _.each(node.members, function (item) {
    self.walk(item, indent, parentIndex)
  })
}

pp.genNode = function(node, indent, parentIndex, initFlag) {
  if (initFlag) {
    this.genNodeInit(node, indent, parentIndex)
  }else {
    return this.genNodeOneLiner(node, indent, parentIndex)
  }
}

pp.genNodeInit = function (node, indent, parentIndex) {
  var currentIndex = this.nodeIndex++
  var tagName = node.name
  if (!/^[A-Z]/.test(node.name)){
    tagName = "\"" + node.name + "\""
  }
  this.lines.push("React.createElement(")
  this.lines.push(inc(indent) + tagName + ",")
  this.lines.push(inc(indent) + this.getAttrs(node))
  if (node.body.members) {
    var self = this
    _.each(node.body.members, function (item) {
      self.append(",")
      self.lines.push(inc(indent) + self.walk(item, indent, parentIndex))
    })
  }
  this.lines.push(indent + ")")
}

pp.genNodeOneLiner = function (node, indent, parentIndex) {
  var str = "";
  var currentIndex = this.nodeIndex++
  var tagName = node.name
  if (!/^[A-Z]/.test(node.name)){
    tagName = "\"" + node.name + "\""
  }
  var pre = "React.createElement(" + tagName + ",";
  str += pre
  str += this.getAttrs(node)
  if (node.body) {
    var body = this.walk(node.body, inc(indent), currentIndex, false)
    if (body) {
      str += body
    }
  }
  str += ")"
  return str  
}

pp.genString = function (node, indent, parentIndex) {
  var line = node
  this.lines.push(line)
}

pp.append = function (str) {
  this.lines[this.lines.length - 1] = this.lines[this.lines.length - 1] + str 
}

pp.getExpr = function (expr, indent, parentIndex) {
 var self = this
 var str = ""
 _.each(expr.members, function (item) {
    str = str + self.walkExpr(item)
  })
 return str
}

pp.getValue = function (value) {
  if (typeof value === "string") {
    return "\"" + value + "\""
  }else {
    return this.getExpr(value)
  }
}

pp.getAttrs = function (node, indent) {
  var str = '{'
  var attrs = node.attributes
  var i = 0;
  for (var key in attrs) {
    var attrStr = this.getValue(attrs[key])
    if (/\-/.test(key)){
      key = "\"" + key + "\""
    }
    if (i++ != 0) {
      str += (', ' + key + ': ' + attrStr)
    } else {
      str += (key + ': ' + attrStr)
    }
  }
  str += '}'

  if (i === 0) {
    return "null"
  }else {
    return str;
  }
}

function inc (indent) {
  return indent + '  '
}

var keyIndex = 0

function getKey () {
  return 'key' + keyIndex++
}




export default CodeGen
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
  this.walk(astRoot, '  ', '0')
}

pp.walk = function (node, indent, parentIndex) {
  if (typeof node === 'string') {
    this.lines.push(",")
    return this.genString(node, indent, parentIndex)
  } else {
    return this['gen' + node.type](node, indent, parentIndex)
  }
}

pp.genStat = function (node, indent, parentIndex) {
  var self = this
  _.each(node.members, function (item) {
    self.walk(item, indent, parentIndex)
  })
}

pp.genNode = function (node, indent, parentIndex) {
  if (this.nodeIndex !== 1) {
    this.lines.push(",")
  }
  var currentIndex = this.nodeIndex++
  var nodeName = 'node' + currentIndex
  var tagName = node.name
  if (!/^[A-Z]/.test(node.name)){
    tagName = "\"" + node.name + "\""
  }
  var pre = "React.createElement(" + tagName + ",";
  this.lines.push(pre)
  this.lines.push(pp.getAttrs(node))
  if (node.body) {
    this.walk(node.body, indent, currentIndex)
  }
  this.lines.push(')')
}

pp.genString = function (node, indent, parentIndex) {
  var line = indent + 'node' + parentIndex + '.children.push(' + getInterpolation(node) + ')'
  line = line.replace('\n', '\\n')
  this.lines.push(line)
}

pp.getAttrs = function (node) {
  var str = '{'
  var attrs = node.attributes
  var i = 0;
  for (var key in attrs) {
    var attrStr = getInterpolation(attrs[key])
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

function getInterpolation (node) {
  var reg = /\{[\s\S]+?\}/g
  var inters = node.match(reg)
  var strs = node.split(reg)
  if (!inters) return ['"', '"'].join(node)
  var last = strs[strs.length - 1]
  strs.splice(strs.length - 1, 1)
  var ret = ''
  _.each(strs, function (str, i) {
    ret += ('"' + str + '" + ')
    ret += (
      '(' + inters[i].replace(/[\{\}]/g, '') + ') + '
    )
  })
  ret += ('"' + last + '"')
  return ret
}

export default CodeGen
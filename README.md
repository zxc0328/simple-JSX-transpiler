# Simple JSX transpiler
Simple transpiler that transplie JSX to React-compatible render function. Forked from [livoras/virtual-template](https://github.com/livoras/virtual-template)

**[Playground](https://zxc0328.github.io/simple-JSX-transpiler/)**

### API

```
import tanspiler from ".dist/simple-jsx-transpiler.js"

var code = 
`<div on-click="clickHandler">
    <Bar count = "2" />
 	this.show ? <Bar></Bar> : null
</div>`

var result = transpiler.transpile(code)

```

### Tokens

```
export default {
  TK_TEXT: 1, // 文本节点
  TK_RCB: 2, // {
  TK_END_IF: 3, // {/if}
  TK_GT: 4, // >
  TK_SLASH_GT: 5, // />
  TK_TAG_NAME: 6, // <div|<span|<img|...
  TK_ATTR_NAME: 7, // 属性名
  TK_ATTR_EQUAL: 8, // =
  TK_ATTR_STRING: 9, // "string"
  TK_CLOSE_TAG: 10, // </div>|</span>|</a>|...
  TK_LCB: 11, // }
  TK_EOF: 100 // end of file
}
```

### EBNF

```
Program -> Node | ε
Stat -> Frag Stat | ε
Frag -> Node | Expr | text

Node -> OpenTag NodeTail
OpenTag -> '/[\w\-\d]+/' {Attr}
NodeTail -> '>' Stat '/\<[\w\d]+\>/' | '/>'

Attr -> '/[\w\-\d]/+' Value
Value -> '=' Literal | '=' Expr
Literal -> '/"[\s\S]+"/'
Expr -> ExprFrag Expr | ε
ExprFrag -> text | Node
```

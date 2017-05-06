# Simple JSX transpiler
Simple transpiler that transplie JSX to React-compatible render function.

### Tokens


```
module.exports = {
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
}
```

### EBNF

```
Program -> Node | ε
Stat -> Frag Stat | ε
Frag -> Node | Text | Expr

Node -> OpenTag NodeTail
OpenTag -> '/[\w\-\d]+/' {Attr}
NodeTail -> '>' Stat '/\<[\w\d]+\>/' | '/>'

Text -> text 

Attr -> '/[\w\-\d]/+' Value
Value -> '=' Literal | '=' Expr
Literal -> '/"[\s\S]+"/'
Expr -> '/\{[\s\S]+\}/'
```

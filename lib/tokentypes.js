export default {
  TK_TEXT: 1, // 文本节点
  TK_LCB: 2, // {
  TK_RCB: 3, // }
  TK_GT: 4, // >
  TK_SLASH_GT: 5, // />
  TK_TAG_NAME: 6, // <div|<span|<img|...
  TK_ATTR_NAME: 7, // 属性名
  TK_ATTR_EQUAL: 8, // =
  TK_ATTR_STRING: 9, // "string"
  TK_CLOSE_TAG: 10, // </div>|</span>|</a>|...
  TK_EOF: 100 // end of file
}
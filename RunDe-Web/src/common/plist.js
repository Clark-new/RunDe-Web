export const EmoticonList = [
  '微笑',
  '撇嘴',
  '色',
  '发呆',
  '得意',
  '流泪',
  '害羞',
  '闭嘴',
  '睡',
  '大哭',
  '尴尬',
  '发怒',
  '调皮',
  '呲牙',
  '惊讶',
  '难过',
  '酷',
  '冷汗',
  '抓狂',
  '吐',
  '偷笑',
  '可爱',
  '白眼',
  '傲慢',
  '饥饿',
  '困',
  '惊恐',
  '流汗',
  '憨笑',
  '大兵',
  '奋斗',
  '咒骂',
  '疑问',
  '嘘',
  '晕',
  '折磨',
  '衰',
  '骷髅',
  '敲打',
  '再见',
  '擦汗',
  '抠鼻',
  '鼓掌',
  '糗大了',
  '坏笑',
  '左哼哼',
  '右哼哼',
  '哈欠',
  '鄙视',
  '委屈',
  '快哭了',
  '阴险',
  '亲亲',
  '吓',
  '可怜',
  '菜刀',
  '西瓜',
  '啤酒',
  '篮球',
  '乒乓',
  '咖啡',
  '饭',
  '猪头',
  '玫瑰',
  '凋谢',
  '示爱',
  '爱心',
  '心碎',
  '蛋糕',
  '闪电',
  '炸弹',
  '刀',
  '足球',
  '瓢虫',
  '便便',
  '月亮',
  '太阳',
  '礼物',
  '拥抱',
  '强',
  '弱',
  '握手',
  '胜利',
  '抱拳',
  '勾引',
  '拳头',
  '差劲',
  '爱你',
  'NO',
  'OK',
  '爱情',
  '飞吻',
  '跳跳',
  '发抖',
  '怄火',
  '转圈',
  '磕头',
  '回头',
  '跳绳',
  '挥手'
]

export function translateWXEm (message) {
  var msg = message
  // var reg = new RegExp(/\[[\w]{1,2}\]|\[[\u4e00-\u9fa5]{1,2}\]/gi)
  var reg = new RegExp(/\[[\w]{1,2}\]|\[[\u4e00-\u9fa5]{1,3}\]/gi)
  var arrs = []
  while ((arrs = reg.exec(msg)) != null) {
    var mark = arrs[0] // [微笑]
    var _mark = mark.substring(1, mark.length - 1)
    var index = -1
    for (var i = 0; i < EmoticonList.length; i++) {
      var el = EmoticonList[i]
      if (_mark === el) {
        index = i + 201
        break
      }
    }
    if (index !== -1) {
      msg = msg.replace(mark, '[em2_' + index + ']')
    }
  }
  return msg
}

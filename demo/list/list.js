// demo/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      src: '/images/icon.png',
      title: '强袭飓风',
      content: "吾之所向，皆浮于空吾之所向，皆浮于空吾之所向，皆浮于空吾之所向，皆浮于空吾之所向",
      url: ""
    }],
    itemsSimple: [{
      src: '/images/icon.png',
      title: '席美尔的精华脉冲',
      url: ""
    }],
    itemsPlus: [
      {
        src: '/images/icon.png',
        title: '电磁脉冲',
        titleP_icon: '/images/1.png',
        titleP: 'cost 150',
        stitle: '席美尔的精华脉冲',
        stitleP_icon: '/images/1.png',
        stitleP: 'cd 30',
        content: '席美尔的精华脉冲席美尔的精华脉冲席美尔的精华脉冲席美尔的精华脉冲席美尔的精华脉冲席美尔的精华脉冲席美尔的精华脉冲',
        contentP_icon: '/images/1.png',
        contentP: 'dm 300',
        url: ""
      }
    ]
  },

  GoDetail: function (e) {
    console.log(e.detail)
  }
})
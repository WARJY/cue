// demo/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      src: '/images/icon.png',
      title: '吾之所向，皆浮于空',
      url: ""
    }, {
      src: '/images/icon.png',
      title: '席美尔的精华脉冲',
      url: ""
    }, {
      src: '/images/icon.png',
      title: '哈雷克之火葬魔咒',
      url: ""
    }, {
      src: '/images/icon.png',
      title: '塔拉克的天坠之火',
      url: ""
    }, {
      src: '/images/icon.png',
      title: '布鲁冯特之无力声波',
      url: ""
    }]
  },
  
  GoDetail:function(e){
    console.log(e.detail)
  }
})
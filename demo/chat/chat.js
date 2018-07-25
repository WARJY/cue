// demo/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quickItems:[
      { content: "快速回复1" },
      { content: "快速回复2" },
      {content:"快速回复3"},
    ]
  },

  handleCommit:function(e){
    console.log(e.detail)
  }

})
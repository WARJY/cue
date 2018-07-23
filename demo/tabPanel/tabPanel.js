// demo/tabPanel/tabPanel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabPanel:[
      { Title: "第一页" },
      { Title: "第二页"}
    ]
  },

  handleSwitch:function(e){
    console.log(e.detail)
  }
})
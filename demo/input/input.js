// demo/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maleArray:["男","女"],
    selects:[
      { Id: 1, Name: "IT/互联网" },
      { Id: 2, Name: "主播" },
      { Id: 3, Name: "销售" },
    ]
  },

  handleInput:function(e){
    console.log(e.detail)
    if(e.detail.target){
      console.log("触发字符匹配")
      let target = e.detail.target
      target.setData({
        matchingItems:[
          { content:"emm" }
        ]
      })
    }
  },

  handleSearch:function(e){
    console.log(e.detail)
  },

  handleSelect:function(e){
    console.log(e.detail)
  },

  handleCode:function(e){
    console.log("todo SendCode")
  }

})
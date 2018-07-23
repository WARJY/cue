// demo/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchOn:false
  },

  handleSearchOn:function(e){
    this.setData({
      searchOn:true
    })
  },

  handleKeywords:function(e){
    console.log(e.detail)
    let target = e.detail.target
    target.setData({
      matchingItems:[
        {content:"emmm"}
      ]
    })
  }
})
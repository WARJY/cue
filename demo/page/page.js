Page({
  data: {
    isShow: false
  },

  handleScroll:function(e){
    let scrollTop = e.detail.scrollTop
    console.log('当前页面滚动' + e.detail.scrollTop)
  },

  onLoad: function () {
    setTimeout(() => {
      this.setData({
        isShow: true
      })
    }, 1000)
  }

})
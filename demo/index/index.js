//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShow:false
  },

  onLoad: function () {
    setTimeout(()=>{
      this.setData({
        isShow:true
      })
    },1000)
  }

})

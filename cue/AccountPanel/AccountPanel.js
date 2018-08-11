let app = getApp()

Component({
  externalClasses: ['button'],
  /**
   * 组件的属性列表
   */
  properties: {
    logoUrl:{
      type:String,
      value:""
    },
    showLogin: {
      type: Boolean,
      value:false
    },
    logType:{
      type:Array,
      value:[]
    },
    wxLog:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showInfo: true,
    color:"#199ed8"
  },

  /**
   * 组件的方法列表
   */
  ready() {
    // let UserInfo = wx.getStorageSync("UserInfo")
    // let color = app.color
    // if (UserInfo && UserInfo.nickName && UserInfo.avatarUrl) {
    //   this.setData({
    //     showInfo: false,
    //     showLogin:false,
    //     color: color
    //   })
    // } else {
    //   this.setData({
    //     showInfo: true,
    //     color: color
    //   })
    // }
    if(app.color){
      this.setData({
        color:app.color
      })
    }
  },

  methods: {
    _close: function(e) {
      this.setData({
        showLogin: false
      });
    },
    _getPhoneNumber: function(e) {
      this.triggerEvent("wxLog",e)
    },
    _getUserInfo: function(e) {
      if (e.detail.userInfo) {
        console.log(e.detail.userInfo)
        wx.setStorage({
          key: 'UserInfo',
          data: e.detail.userInfo,
        })
      }
      if (this.properties.wxLog || this.properties.logType.length > 0){
        this.setData({
          showInfo: false
        })
      }else{
        this.setData({
          showLogin:false
        })
        this.triggerEvent("userInfo", e.detail.userInfo)
      }
    },
    _handleLink:function(e){
      let link = e.currentTarget.dataset.item.link
      if(!link) return
      wx.navigateTo({
        url: link,
      })
    }
  }
})
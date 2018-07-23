// Matrix_Wx/UserInfo/UserInfo.js
var app = getApp();
const themes = {
  default: {
    text_center: "center",
    background: "#31365c",
    height: "260",
    font_color: "#fff",
    border_radius: "10rpx",
    padding_top: "40rpx",
    font_size: "32rpx"
  }
}
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    theme: { type: String, value: 'default' }
  },
  /**
   * 组件的初始数据
   */
  data: {
    siteUrl: app.siteUrl,
    currentTheme: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGetUserInfo: function (e) {
    }
  },
  ready() {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    this.setData({
      currentTheme: themes[this.properties.theme]
    })
  }
})

Page({
  data: {
    logType: [
      { icon:"/images/phone.png", text: "手机号登录", link: "/pages/login/login" }
    ]
  },

  handleUserInfo:function(e){
    console.log("用户信息为" + e.detail)
  },

  handleWxLog:function(e){
    console.log("获取用户手机号码事件" + e.detail)
  }
})

// demo/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Items:[
      { src: "/images/1.png", title: "按钮", url: "" },
      { src: "/images/1.png", title: "按钮", url: "" },
      { src: "/images/1.png", title: "按钮", url: "" },
      { src: "/images/1.png", title: "按钮", url: "" },
      { src: "/images/1.png", title: "按钮", url: "" },
    ]
  },

  handleNext:function(e){
    console.log(e.detail)
  }
})
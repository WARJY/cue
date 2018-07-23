// Matrix_Wx/ShareBtn/ShareBtn.js
const themes = {
    default:{
      className:"btn-share"
    },
    Bottom:{
      className:"btn-share-bottom"
    }
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: Array, value: [] },
    theme: { type: String, value: "default" }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTheme: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  ready() {
    this.setData({
      currentTheme: themes[this.properties.theme]
    })

  }
})

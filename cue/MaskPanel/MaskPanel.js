// Matrix_Wx/MaskPanel/MaskPanel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isshow: { type: Boolean, value: false },
    value: { type: Object }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close: function () {
      this.setData({
        isshow: false
      })
    },
    onTap: function () {
      if (this.properties.value && this.properties.value.Url) {
        wx.navigateTo({ url: this.properties.value.Url, })
      }
    }
  }
})

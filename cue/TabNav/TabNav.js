// Matrix_Wx/ToolNav/ToolNav.js
const themes = {
  default: {
    className: "tabnav_bottom",
    font_color_light:"#999999",
    font_color_dark:"#666666",
   background:"#fafafa",
   margin_bottom:"20rpx",
   margin_top:"6rpx",
   font_size_top:"55rpx",
   font_size_bottom:"20rpx"
  }
}
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    theme: { type: String, value: "default" },
    pageLink: { type: String },

  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {}
  },

  methods: {
    gopage: function (e) {
      console.log(e);
      // detail对象，提供给事件监听函数
      this.triggerEvent('gopage', { id: e.currentTarget.dataset.id, url: e.currentTarget.dataset.url });
    }
  },
  ready() {
    this.setData({
      currentTheme: themes[this.properties.theme]
    })
  }
})
// Matrix_Wx/Grid/Grid.js
const themes = {
  default: {
    className: "flex-row",
    width:"50%",
    font_size_title:'30rpx',
    font_size_content:'26rpx',
    font_color_light:"#a9a9a9",
    font_color_dark:"#686868",
    height_top: "90rpx",
    height_bottom: "90rpx",
    line_height_top: "90rpx",
    line_height_bottom: "90rpx",
    padding: "0rpx 26rpx 10rpx 26rpx",
    is_order:true
  },
  gridVer: {
    className: "flex-column",
    width: "50%",
    font_size_title: '26rpx',
    font_size_content: '48rpx',
    font_color_light: "#686868",
    font_color_dark: "#a9a9a9",
    height_top:"45rpx",
    height_bottom: "80rpx",
    line_height_top: "65rpx",
    line_height_bottom: "80rpx",
    padding: "0rpx 26rpx 10rpx 26rpx",
    is_order: false,
    is_arrow:true,
    font_weight:'700',
    className:"arrow_v"
  }
}
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    title: { type: String, value: "" },
    theme: { type: String, value: 'default' },


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
    this.setData({ currentTheme: themes[this.properties.theme] })
  }
})

// Matrix_Wx/CardList/CardList.js
const themes = {
  default: {
    font_color_light: "#c7c7c7",
    font_color_dark: "#4a4a4a",
    font_size_top: "32rpx",
    font_size_middle: "24rpx",
    font_size_bottom: "24rpx",
    is_border: true,
    margin: "0  20rpx",
    margin_left: "20rpx",
    margin_bottom: "20rpx",
    padding_tb: "20rpx 0",
    background:"#fff"
  },
  cardListTheme2:{
    font_color_light: "#fff",
    font_color_dark: "#fff",
    font_size_top: "64rpx",
    font_size_middle: "24rpx",
    font_size_bottom: "32rpx",
    is_border_right: true,
    margin: "0  20rpx",
    margin_left: "20rpx",
    margin_bottom: "20rpx",
    padding_tb: "20rpx 0",
    background: "none",
    text_align:"center",
    line_height:4,
  }
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    title: { type: String, value: "" },
    theme: { type: String, value: 'default' },
    imageWidth: { type: 'String', value: '320' },
    imageHeight: { type: 'String', value: '200' },

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
    this.setData({ currentTheme: themes[this.properties.theme] });
  }
})

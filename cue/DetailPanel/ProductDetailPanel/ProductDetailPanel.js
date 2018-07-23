// Matrix_Wx/ProductDetailPanel/ProductDetailPanel.js
const themes = {
  default: {
    font_color_light: "#bbbbbb",
    font_color_dark: "#202020",
    f_color_colour:"#ff3c00",
    font_size_top: "32rpx",
    font_size_middle: "28rpx",
    font_size_bottom: "24rpx",
    is_border: true,
    margin: "0  20rpx",
    margin_left: "20rpx",
    margin_bottom: "20rpx",
    padding_tb: "20rpx 0",
    background: "#fff",
    background_state:"#F9D45F",
    color_state:"#202020",
 
    padding:"20rpx",
    row_count_top: 1,
    row_count_middle: 2,
    row_count_bottom: 1,
    line_height_1:1,
    line_height_15: 1.5,
    line_height_2: 2,
    font_weight:700
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
currentTheme:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready(){
    this.setData({ currentTheme: themes[this.properties.theme] })

  }

})

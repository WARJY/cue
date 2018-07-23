// Matrix_Wx/DetailPanel/DetailPanel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: Object, value: {}, observer: 'getValue'},
    config: { type: Object, value: {} },
    detailtype: { type: String, value: 'news' }
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
    getValue(val) { console.log(val); }

  }
})

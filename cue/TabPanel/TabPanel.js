// Matrix_Wx/TabPanel/TabPanel.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [],

  /**
   * 组件的属性列表
   */
  properties: {
    Items: { type: Array, value: [] },
    type:{type:String,value:"default"},
    defaultTab:{ type: Number, value:0 }, 
    height:{type: Number, value:100},
    topheight:{type:Number,value:100},
    fixedTop: { type: Number, value: 0 },
    currentTop: { type: Number, value: null }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab:0
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    this.setData({
      currentTab: this.properties.defaultTab
    })
    this.triggerEvent('switchTab', { index: this.properties.defaultTab, item: this.properties.Items[this.properties.defaultTab] }, {})
  },
  methods: {
    _handleTab:function(e){
      this.setData({
        currentTab: e.currentTarget.dataset.index
      })
    },
    _handelSwipe:function(e){
      this.setData({
        currentTab: e.detail.current
      })
      this.triggerEvent('switchTab', { index: e.detail.current, item: this.properties.Items[e.detail.current] }, {})
    }
  }
})

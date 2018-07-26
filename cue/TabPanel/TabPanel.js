// Matrix_Wx/TabPanel/TabPanel.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    Items: { type: Array, value: [] },
    type:{type:String,value:"default"},
    defaultTab:{ type: Number, value:0 }, 
    height:{type: Number, value:100},
    fixedTop: { type: Number, value: 0 },
    currentTop: { type: Number, value: null }
  },

  data: {
    currentTab:0
  },

  ready: function () {
    this.setData({
      currentTab: this.properties.defaultTab
    })
    let query = wx.createSelectorQuery()
    query.select('#slot' + this.properties.defaultTab).boundingClientRect()
    query.selectViewport()
    query.exec((res) => {
      this.setData({
        height: res[0].height
      })
    })
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
      let query = wx.createSelectorQuery()
      query.select('#slot0').boundingClientRect()
      query.selectViewport()
      query.exec((res)=>{
        console.log(res[0].height)
        this.setData({
          height: res[0].height
        })
      })
      this.triggerEvent('switchTab', { index: e.detail.current, item: this.properties.Items[e.detail.current] }, {})
    }
  }
})

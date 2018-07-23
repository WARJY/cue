// Matrix_Wx/TabPanel/TabPanel.js
Component({
  behaviors: [],

  /**
   * 组件的属性列表
   */
  properties: {
    type: { type: String, value: 'default' },
    value: { type: Array, value: [] },
    activeColor:{type:String, value:"" },
    fixedTop:{type:Number,value:0},
    currentTop:{type:Number,value:null}
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0,
    detailOn: false,
    currentDetail: []
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    let currentDetail = []
    for (let i in this.properties.value){
      currentDetail.push(this.properties.value.currentDetail)
    }
    
  },
  methods: {
    _handleTab: function (e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        currentTab: index,
        detailOn:true
      })
    },
    _handleDetail: function (e) {
      let index = e.currentTarget.dataset.index
      let item = e.currentTarget.dataset.item
      this.replaceDataOnPath(['currentDetail', this.data.currentTab], item) 
      this.replaceDataOnPath(['detailOn'], false) 
      this.applyDataUpdates()
      this.triggerEvent('panelSerach', this.data.currentDetail, {})
    },
    _close:function(e){
      this.setData({
        detailOn: false
      })
    }
  }
})

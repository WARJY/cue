// Matrix_Wx/TabPanel/TabPanel.js
let app = getApp()
Component({
  behaviors: [],

  /**
   * 组件的属性列表
   */
  properties: {
    type: { type: String, value: 'default' },
    items: { type: Array, value: [], observer: "onSetItems" },
    value: { type: Array, value: [], observer: "onSetValue" },
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
    currentDetail: [],
    data:[]
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
  },
  methods: {
    onSetItems:function(val,old){
      if(val){
        for (let i in val) {
          let item = val[i]
          if (item.load === true && item.path) {
            app.post(item.path).then(data => {
              let len = this.data.data.length
              let value = val[len].value ? val[len].value : ""
              let currentIndex = 0
              for(let d in data.Items){
                if(data.Items[d].Id === value){
                  currentIndex = parseInt(d) + 1
                }
              }
              data.Items.unshift({ Id: 0, Name: "全部" })
              this.setData({
                ['data[' + len + ']']: data.Items,
                ['currentDetail[' + len + ']']: currentIndex === 0 ? data.Items[0]:data.Items[currentIndex]
              })
            }).catch(e => {})
          }
        }
      }
    },
    onSetValue:function(val,old){
      if(val){
        this.setData({
          data:val,
          currentDetail:[val[0][0],val[1][0]]
        })
      }
    },
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
      this.setData({
        ['currentDetail[' + this.data.currentTab + ']']:item,
        detailOn:false
      })
      let detail = {}
      for (let i in this.properties.items){
        detail[this.properties.items[i].name] = this.data.currentDetail[i]
      }
      this.triggerEvent('panelSerach', detail)
    },
    _close:function(e){
      this.setData({
        detailOn: false
      })
    }
  }
})

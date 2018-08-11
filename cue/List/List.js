let app = getApp()
Component({
  externalClasses: ['img','title','stitle','content','titleP','stitleP','contentP','more'],
  properties: {
    type: {
      type: String,
      value: 'text'
    },
    listTitle: {
      type: String,
      value: ''
    },
    stitle: {
      type: String,
      value: ''
    },
    items: {
      type: Array,
      value: []
    },
    more: {
      type: String,
      value: ''
    }
  },

  ready:function(){
    if(app.color){
      let color = app.color
      this.setData({
        color: color
      })
    }
  },

  methods: {
    _goDetail:function(e){
      let item = e.currentTarget.dataset.item;
      if(item && item.url){
        wx.navigateTo({
          url: item.url,
        })
      }else{
        this.triggerEvent('goDetail', item)
      }
    },
    _goMore:function(e){
      this.triggerEvent('getMore', {}, {})
    }
  }
})
Page({})
Component({
  properties: {
    type: {
      type: String,
      value: 'text'
    },
    title: {
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

  data: {

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
Component({
  properties: {
    cols:{
      type:Number,
      value:4
    },
    image:{
      type:Object,
      value:{},
      observer:"onSetImg"
    },
    Items:{
      type:Array,
      value:[]
    }
  },

  data: {
    imgStyle:""
  },

  methods: {
    onSetImg:function(val,old){
      if(val){
        let style = ""
        for(let v in val){
          style += v + ":" + val[v] + ";"
        }
        this.setData({
          imgStyle:style
        })
      }
    },
    _handleMenu:function(e){
      let item = e.currentTarget.dataset.item
      if(item && item.url.length>0){
        wx.navigateTo({
          url: item.url,
        })
      }else{
        this.triggerEvent('next',item)
      }
    }
  }
})
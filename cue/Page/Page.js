Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer:'isShowChange'
    }
  },

  data: {
    touchStart: 0,
    touchEnd: 0,
    scrollTop: 0,
    change: false,
    currentTheme: {}
  },

  ready: function() {
    let query = wx.createSelectorQuery()
    query.select('#page').boundingClientRect()
    this.query = query;
    this.getTop();
    if (this.properties.isShow !== true) wx.showLoading({ title: '加载中', })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isShowChange:function(val,old){
      if(val === true && old === false){
        wx.hideLoading()
      }
    },
    getTop: function() {
      setTimeout(() => {
        this.query.selectViewport().scrollOffset()
        this.query.exec(res => {
          if (this.data.scrollTop !== res[1].scrollTop) {
            this.data.scrollTop = res[1].scrollTop;
            this.data.change = true;
          } else {
            if (this.data.change) {
              this.data.change = false;
              this.triggerEvent('scroll', {
                scrollTop: res[1].scrollTop
              }, {});
            }
          }
          this.getTop();
        })
      }, 30);
    },
    _touchMove: function(e) {
      this.query.selectViewport().scrollOffset()
      this.query.exec(res => {
        this.setData({
          scrollTop: res[1].scrollTop
        })
        this.triggerEvent('scroll', {
          scrollTop: res[1].scrollTop
        }, {})
      })
    },
    _touchMovend: function(e) {
      this.query.selectViewport().scrollOffset()
      this.query.exec(res => {
        this.setData({
          scrollTop: res[1].scrollTop
        })
        this.triggerEvent('scroll', {
          scrollTop: res[1].scrollTop
        }, {})
      })
    }
  }
})
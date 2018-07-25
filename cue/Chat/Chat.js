Component({
  properties: {
    value: {
      type: Object,
      value: {}
    },
    quickItems: {
      type: Array,
      value: []
    },
    placeholder: {
      type: String,
      value: ""
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    Items: [],
    LastTime: undefined,
    More: true,
    Top: 0
  },

  methods: {
    _showInput: function() {
      this.setData({
        showComment: true,
        reply: ""
      })
    },
    _onLoadLast:function(){
      
    },
    _quick: function(e) {
      let content = e.currentTarget.dataset.val;
      this.setData({
        reply: content
      })
    },
    _input: function(e) {
      this.setData({
        reply: e.detail.value
      })
    },
    _commit: function(e) {
      let reply = this.data.reply
      this.setData({
        showComment: false
      })
      this.triggerEvent('commit', {reply:reply});
    },
    _close: function(e) {
      this.setData({
        showComment: false
      })
    }
  }
})
// Matrix_Wx/List/List.js 
const themes = {
  default: {
    background: "#f4f4f4",
    font_size: "32rpx",
    border_left: true,
    padding_left: "20rpx",
    font_weight: "400",
    padding_lr: "0 20rpx;"
  },
  noneTheme: {
    font_size: "36rpx",
    font_weight: "400",
    font_color_dark: "#202020",
  },
  nonePadding: {
    padding_lr: "0;"
  }
}
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    value: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ""
    },
    theme: {
      type: String,
      value: 'default'
    },
    themeTitle: {
      type: String,
      value: 'default'
    },
    moreLink: {
      type: String
    },
    moreLinkColor: {
      type: String,
      value: '#c9c9c9'
    },
    imageWidth: {
      type: 'String',
      value: '320'
    },
    imageHeight: {
      type: 'String',
      value: '200'
    },
    imageBorderRadius: {
      type: 'number'
    },
    pannelType: {
      type: Number,
      value: 1
    },
    pageLink: {
      type: String
    },
    scrollHeight: {
      type: String,
      value: ""
    },
    scrollView: {
      type: Boolean,
      value: false
    },
    btn_text: {
      type: String,
      value: ""
    },
    btn_action: {
      type: String,
      value: ""
    },
    btn_type: {
      type: String,
      value: ""
    },
    showEmpty: {
      type: Boolean,
      value: true
    },
    buttons: {
      type: Array,
      value: []
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {}
  },

  methods: {
    OnTap: function() {
      this.triggerEvent('gopage', {
        url: this.data.moreLink
      }, {})
    },
    gopage: function(e) {
      let url = this.data.pageLink;
      if (url) {
        if (url.indexOf('?') > -1) {
          url += '&id=' + e.detail.id;
        } else {
          url += '?id=' + e.detail.id;
        }
      } else {
        url = '';
      }
      let params = {
        url: url || e.detail.url || '',
        name: e.detail.name,
        id: e.detail.id
      };
      this.triggerEvent('gopage', params, {})
    },
    _scrollBottom: function(e) {
      this.triggerEvent('onBottom', {})
    }
  },
  ready() {
    this.setData({
      currentTheme: themes[this.properties.themeTitle]
    })
  }
})
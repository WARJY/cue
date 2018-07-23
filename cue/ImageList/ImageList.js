// Matrix_Wx/List/List.js 
const themes = {
  default: {
    font_size: "36rpx",
    border_left: true,
    padding_left: "20rpx",
    font_weight: 900
  },

  imageListHor: {
    className: "flex-row"
  },
  imageListVer: {
    className: "flex-column",
    width: "375rpx"
  }
}
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    title: { type: String, value: "" },
    theme: { type: String, value: 'default' },
    themeTitle: { type: String, value: 'default' },
    moreLink: { type: String },
    moreLinkColor: { type: String, value: '#c9c9c9' },
    imageWidth: { type: 'String', value: '320' },
    imageHeight: { type: 'String', value: '200' },
    pageLink: { type: String }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {}
  },

  methods: {
    gopage: function (e) {
      let params = { url: this.data.pageLink ? this.data.pageLink + '?id=' + e.detail.id : '', name: e.detail.name, id: e.detail.id, url2: e.detail.url2 };
      this.triggerEvent('gopage', params, {})
    }
  },
  ready() {
    this.setData({ currentTheme: themes[this.properties.theme] })
  }
})
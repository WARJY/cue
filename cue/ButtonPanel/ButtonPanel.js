// Matrix_Wx/ToolNav/ToolNav.js
const themes = {
  default: {
    boxClassName: "flex-row toolnav-box",
    inClassName: "flex-column",
    is_border: false,
    is_arrow: false,
    is_topBorder: false,
    is_categroy: false,
    padding: 0,
    font_text_size: "28rpx",
    is_wrap: false
  },
  ButtonColumn: {
    boxClassName: "flex-column",
    inClassName: "flex-row",
    row_count: 1,
    is_border: true,
    is_topBorder: true,
    is_arrow: true
  },
  scrollRow: {
    boxClassName: "flex-row scroll-box",
    inClassName: "flex-column",
    row_count: 1,
    is_categroy: true
  },
  Wrap: {
    is_wrap: true
  }
}
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    imageBorderRadius: { type: Number, value: '50' },
    pageLink: { type: String },
    theme: { type: String, value: "default" },
    imageWidth: { type: Number, value: 100 },
    imageHeight: { type: Number, value: 100 },
    items: { type: Number, value: 4 },
    isrow: { type: Boolean, value: true }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {},
    activeId: ''
  },
  methods: {
    gopage: function (e) {
      this.setData({ activeId: e.currentTarget.dataset.id });
      this.triggerEvent('gopage', { id: e.currentTarget.dataset.id, url: e.currentTarget.dataset.url });
    }
  },
  ready() {
    let defaultTheme = themes.default;
    let currentTheme = themes[this.properties.theme];
    let theme = {};
    for (let p in defaultTheme) {
      if (defaultTheme.hasOwnProperty(p)) {
        if (currentTheme.hasOwnProperty(p)) {
          theme[p] = currentTheme[p];
        } else {
          theme[p] = defaultTheme[p];
        }
      }
    }
    this.setData({ currentTheme: theme });
  }
})
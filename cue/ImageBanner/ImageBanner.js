const themes = {
  default: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    imageWidth: "750"
  },
  boxSwiper: {
    autoplay: false,
    interval: 0,
    duration: 0,
  },
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
    height: { type: Number, value: '400' },

  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {}
  },

  methods: {


  },
  created() {

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
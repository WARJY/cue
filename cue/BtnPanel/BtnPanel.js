// Matrix_Wx/BtnPanel/BtnPanel.js
const themes = {
  default: {
    className: "btn-default",
  },
  Bottom: {
    className: "btn-bottom"
  },
  BottomGroup: {
    className: "btn-bottom-group"
  },
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    isshow: {
      type: Boolean,
      value: true
    },
    theme: {
      type: String,
      value: "default"
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTheme: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

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
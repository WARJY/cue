// Matrix_Wx/FormBtn/FormBtn.js
const themes = {
  Default: {
    className: "formBtnDefault",
    background: ''
  },
  Bottom: {
    className: "formBtnBottom",

  },
  BottomGroup: {
    className: "formBtnBottomGroup",
    btnNum: 2
  }
}
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    title: { type: String, value: "" },
    theme: { type: String, value: 'Default' },
    link: { type: String },
    back: { type: Boolean, value: false },
    background: { type: String }
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
    OnTap: function (e) {
      console.log(e);
      if (this.properties.back === 'true') {
        this.triggerEvent('gopage', { back: true });
      }
      if (this.properties.link) {
        this.triggerEvent('gopage', { url: this.properties.link });
      }
      this.triggerEvent('tap')
    }

  }, ready() {
    this.setData({ currentTheme: themes[this.properties.theme] });
  },
})

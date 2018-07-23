// Matrix_Wx/List/List.js 

const themes = {
  default: {
    TitleFontSize: "32rpx",
    LabelFontSize: "28rpx",
    TopRightFontSize: "36rpx",
    TitleFontColor: "#686868",
    LabelFontColor: "#bbbbbb",
    TopRightFontColor: "#31c27c",
    TextAlign:"left",
    is_border:true
  },
Info:{
  TitleFontSize: "80rpx",
  TitleFontColor: "#fff",
  LabelFontColor: "#fff",
  TextAlign: "center",
  is_border: false
},
 
}


Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Object, value: {} },
    Title: { type: String, value: "" },
    theme: { type: String, value: 'default' },
    imageWidth: { type: 'String', value: '320' },
    imageHeight: { type: 'String', value: '200' },
    pageLink: { type: String },
    icon: { type: Boolean, value: false },
    TopRightWidth:{type:String,value:'300'},
    is_border:{type:Boolean,value:true}

  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {},

  },

  methods: {
    GotoDetail: function () {

      this.triggerEvent('gopage', { id: this.data.value.Id, name: this.data.name, url: this.data.value.Url });
    }
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
    this.setData({
      currentTheme: theme
    });
  }
})

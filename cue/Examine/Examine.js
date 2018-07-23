const app = getApp()
const themes = {
  default: {
    width: "80",
    height: "80",
    MiddleFontSize: "",
    MiddleFontColor: ""
  },
  Column: {
    width: "256",
    height: "256",
    MiddleFontSize: "28rpx",
    MiddleFontColor: "#a6a9af"
  }
}
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [],
  properties: {
    image: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    },
    description: {
      type: String,
      value: ""
    },
    path: {
      type: String,
      value: ""
    },
    field: {
      type: String,
      value: "State"
    },
    reasonfield: {
      type: String,
      value: 'Reason'
    },
    method: {
      type: String,
      value: ""
    },
    Items: {
      type: Array,
      value: ""
    },
    theme: {
      type: String,
      value: "default"
    },
    uploadImg: {
      type: String,
      value: "/res/images/user_card.png"
    },
    uploadDesc: {
      type: String,
      value: ""
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    showForm: false,
    currentTheme: {}
  },

  /**
   * 组件的方法列表
   */
  ready: function () {

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



    let path = this.properties.path;
    let field = this.properties.field;
    let method = this.properties.method;
    let reasonfield = this.properties.reasonfield;
    app.post(path + '.GetList', {
      page: 1,
      pageSize: 1,
      GetCache: false,
      GetParent: true
    },true).then(data => {
      if (data.Items.length === 0) {
        this.setData({
          state: 0,
          reason: '',
          params: {
            [field]: 1
          }
        })
      } else {
        method = "Modify";
        console.log(data.Items[0])
        this.setData({
          state: data.Items[0][field] || 0,
          currentValue: data.Items[0],
          reason: data.Items[0][field] === 2 ? data.Items[0][reasonfield] : '',
          showstate: data.Items[0].Parent['IsShow' + field],
          params: { [field]: 1 },
          parent: data.Items[0].Parent
        })
      }
    }).catch(e => {
      app.showError(e)
    })
  },

  methods: {
    setShowState: function (e) {
      let field = this.properties.field;
      let path = this.properties.path;
      let state = this.data.parent['IsShow' + field];
      let IsShowFieldName = 'IsShow' + field;
      let updataValue = {};
      updataValue[IsShowFieldName] = !state;
      updataValue.Id = this.data.parent.Id;
      app.post(path.split('.')[0] + '.self.setIsShow' + field, updataValue).then(data => {
        this.setData({
          showstate: data[IsShowFieldName],
          parent: data
        });
      })
    },
    _handleCheck: function (e) {
      this.setData({
        showForm: true
      })
    },
    _handleCommit: function (e) {
      console.log(e.detail)
      if (e.detail.result) {
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          state: e.detail.result[this.properties.field],
          showForm: false
        })
      } else {
        app.showError(e.detail.error)
      }
    },
    goBack: function () {
      wx.navigateBack({

      })
    }
  }
})
let app = getApp()
const themes = {
  default: {
    background: "#fff",
    radius: "10rpx;",
    image_radius: "100%",
    row_con: "2",
    row_title: "1",
    color: "#31c27c",
    m_b: "20rpx"
  },
  text: {
    m_b: "0"
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
      type: Object,
      value: {}
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
    rightFWidth: {
      type: 'String',
      value: '132'
    },

    buttonTWidth: {
      type: 'String',
      value: '132'
    },
    rightTWidth: {
      type: 'String',
      value: '200'
    },
    pageLink: {
      type: String
    },
    imageBorderRadius: {
      type: Number
    },
    framewidth: {
      type: Number,
      value: 0
    },
    funfield: {
      type: String,
      value: 'Member'
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
    Url: {
      type: String,
      value: ""
    },
    buttons: {
      type: Array,
      value: []
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {},
    modalOn: false,
    modalInput: ""
  },

  methods: {
    GotoDetail: function() {
      this.triggerEvent('gopage', {
        id: this.data.value.Id,
        name: this.data.name,
        url: this.data.value.Url
      });
    },
    onFun: function(e) {
      console.log(e);
      let action = e.currentTarget.dataset.name;
      switch (action) {
        case '加好友':
          this.setData({
            modalOn: true
          })
      }
    },
 
    onButtonClick: function(e) {
      console.log(e.currentTarget.dataset.index)
      let button = this.properties.buttons[e.currentTarget.dataset.index];
      let foo = () => {
        app.post(button.Path, Object.assign({
          Id: this.properties.value.Id
        }, button.Params)).then(data => {
          if (button.AfterDo === 'reload') {
            app.reload();
          } else {
            wx.navigateBack()
          }
        }).catch(e => {
          app.showError(e);
        })
      }
      if (button.Message) {
        wx.showModal({
          title: '',
          content: button.Message,
          showCancel: true,
          success: (res) => {
            console.log(res);
            if (res.confirm === true) foo();
          }
        })
      } else {
        foo();
      }
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
    this.setData({
      currentTheme: theme
    });
  }
})
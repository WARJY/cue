// Matrix_Wx/UserPanel/UserPanel.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },
    value: {
      type: Object,
      observer: 'setValue'
    },
    showtime: {
      type: Date,
      observer: 'getShowtime'
    },
    registUrl: {
      type: String,
      value: "/pages/my/person/person"
    },
    params: {
      type: Object,
      value: {
        GetCity: true,
        GetTrade: true
      }
    },
    isedit:{type:Boolean , value:false},
    defined: {
      type: Object,
      value: {
        Image: ["FaceImage"],
        TrueName: ["TrueName|NickName"],
        Label: ["Postion", "Trade.Name"],
        Company: ["Company"],
        ContractMobile: ["ContractMobile"],
        ContractWx: ["ContractWx"],
        JobState: ["JobState"],
        NetMediaState: ["NetMediaState"],
        NetStarState: ["NetStarState"],
        UserMediaState: ["UserMediaState'"],
        IsVIP: ["IsVIP"]
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    siteUrl: app.siteUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setValue: function(val) {
      if (val) {
        let data = {};
        for (let p in this.properties.defined) {
          if (this.properties.defined.hasOwnProperty(p)) {
            data[p] = app.getData(val, this.properties.defined[p]);
          }
        }
        this.setData({
          info: data
        })
      }
    },
    GotoDetail: function(e) {
      if (e.detail.userInfo) {
        wx.setStorageSync('UserInfo', e.detail.userInfo);
        let foo = (OpenId) => {
          if (OpenId) {
            app.post("member.self.WxProgramRegistOpenId", {
              NickName: e.detail.userInfo.nickName || '',
              FaceImage: e.detail.userInfo.avatarUrl || '',
              //City: e.detail.userInfo.city || '',
              //Province: e.detail.userInfo.province || '',
              OpenId: OpenId
            }).then(data => {
              app.setToken(data);
              wx.navigateTo({
                url: this.properties.registUrl
              })
            }).catch(e => {
              app.showError(e);
            })
          }
        }
        if (app.globalData.OpenId === undefined)
          app.login().then(data => {
            if (data.OpenId) {
              foo(data.OpenId)
            } else {
              wx.navigateTo({
                url: this.properties.registUrl
              })
            }
          });
        else foo(app.globalData.OpenId);
      }
    },
    getShowtime: function(e) {
      this.getUserInfo();
    },
    getUserInfo: function(e) {
      if (app.getToken()) {
        if (!this.properties.value && this.properties.name) {
          app.post(this.properties.name + '.self', this.properties.params).then(data => {
            this.setData({
              value: data
            });
          }).catch(e=>{
            let user = app.getToken().Parent;
            this.setData({
              value: user
            });
          })
        } else {
          let d = wx.getStorageSync('updateUser');
          if (d === 1) {
            wx.setStorageSync('updateUser', 0);
            if (this.properties.name) {
              app.post(this.properties.name + '.self', this.properties.params).then(data => {
                this.setData({
                  value: data
                });
              })
            }
          }
        }
      }
    },
    goEdit: function() {
      wx.navigateTo({
        url: this.properties.registUrl,
      })
    }
  },
  ready() {
    //this.getUserInfo();
  }
})
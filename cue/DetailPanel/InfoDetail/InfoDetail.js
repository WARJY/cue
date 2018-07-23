// Matrix_Wx/Details/InfoDetail/InfoDetail.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Object,
      value: {},
      observer: 'getValue'
    },
    path: {
      type: String,
      value: 'info.member'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Image: '',
    quickItems: [{
        Id: 1,
        content: "合作"
      },
      {
        Id: 2,
        content: "我有您需要的资源，可以合作"
      },
      {
        Id: 3,
        content: "好的，期待合作成功"
      },
      {
        Id: 4,
        content: "有兴趣可以聊聊"
      }
    ],
    input: "",
    favor: null,
    siteUrl: app.siteUrl,
    repeat: null,
    IsSelf: false
  },

  attached: function() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
 
    _handleTop: function(e) {
      wx.navigateTo({
        url: '/pages/publish/top/top',
      })
    },
    _handleBanner: function(e) {
      wx.navigateTo({
        url: '/pages/publish/banner/banner',
      })
    },
    handleReal: function(e) {
      if (wx.getStorageSync('Real' + this.properties.value.Id) !== "") return
      app.post(this.properties.path + ".Real.Add", {
        ParentId: this.properties.value.Id
      }).then(data => {
        this.setData({
          real: data
        })
        wx.showToast({
          title: "评价成功"
        })
        wx.setStorage({
          key: 'Real' + this.properties.value.Id,
          data: true,
        })
        this.properties.value.RealCount += 1;
        this.setData({
          value: this.properties.value
        })
      }).catch(e => {
        app.showError(e)
      })
    },
    handleNoReal: function(e) {
      if (wx.getStorageSync('Real' + this.properties.value.Id) !== "") return
      app.post(this.properties.path + ".NoReal.Add", {
        ParentId: this.properties.value.Id
      }).then(data => {
        this.setData({
          noReal: data
        })
        wx.showToast({
          title: "评价成功"
        })
        wx.setStorage({
          key: 'Real' + this.properties.value.Id,
          data: false,
        })
        this.properties.value.NoRealCount += 1;
        this.setData({
          value: this.properties.value
        })
      }).catch(e => {
        app.showError(e)
      })
    },
    getValue(val) {
      if (val) {
        if (val.Id) {
          let real = wx.getStorageSync('Real' + val.Id)
          this.setData({
            real: real
          })
          let token = app.getToken();
          let IsSelf = token && token.Parent.Id === val.Member.Id;
          this.setData({
            IsSelf: IsSelf
          })
          if (this.properties.path) {
            app.post(this.properties.path + '.Favor.GetList', {
              ParentId: val.Id,
              Page: 1,
              PageSize: 1
            }).then(data => {
              if (data.Items.length > 0) {
                this.setData({
                  favor: data.Items[0]
                })
              }
            })
          }
          if (this.properties.path) {
            app.post(this.properties.path + '.Repeat.GetList', {
              ParentId: val.Id,
              Page: 1,
              PageSize: 1
            }).then(data => {
              if (data.Items.length > 0) {
                this.setData({
                  repeat: data.Items[0]
                })
              }
            })
          }

          if (val.Member && val.Member.FaceImage) {
            this.setData({
              Image: val.Member.FaceImage.indexOf('http') > -1 ? val.Member.FaceImage : app.siteUrl + val.Member.FaceImage
            })

          }
        }
      }

    },
    onFav: function(e) {
      if (this.properties.path) {
        if (this.data.favor) {
          app.post(this.properties.path + '.Favor.delete', {
            Id: this.data.favor.Id
          }).then(data => {
            this.setData({
              favor: null
            });
            wx.showToast({
              title: "已取消收藏"
            })
          })
        } else {
          app.post(this.properties.path + '.Favor.add', {
            ParentId: this.properties.value.Id
          }, true).then(data => {
            this.setData({
              favor: data
            });
            wx.showToast({
              title: "收藏成功"
            })
          }).catch(e => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          })
        }
      }
    },
    _showInput: function() {
      this.setData({
        showComment: true,
        reply: ""
      })
    },
    _quick: function(e) {
      let content = e.currentTarget.dataset.val;
      console.log(content)
      this.setData({
        reply: content
      })
    },
    _input: function(e) {
      this.setData({
        reply: e.detail.value
      })
    },
    _commit: function(e) {
      console.log(1)
      let content = this.data.reply;
      if (!content) return app.showError('请填写回复!');
      if (content.length > 140) return app.showError('文字数量不能超过140个字');
      this.setData({
        showComment: false
      })
      if (this.properties.path) {
        app.post(this.properties.path + '.Repeat.add', {
          ParentId: this.properties.value.Id,
          Summary: content
        }, true).then(data => {
          this.setData({
            repeat: data
          });
          this.triggerEvent('commit', {
            input: this.data.reply
          })
        }).catch(e => {
          app.showError(e)
        })
      }
    },
    _close: function(e) {
      this.setData({
        showComment: false
      })
    },
    goUser: function(e) {
      console.log(1)
      wx.navigateTo({
        url: '/pages/connections/person/person?id=' + this.properties.value.Member.Id
      })
    },
    onShareAppMessage:function(e){
      console.log(e)
    },
    _copy:function(e){
      console.log(e)
      wx.setClipboardData({
        data: e.currentTarget.dataset.value,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            }
          })
        }
      })
    },
    _call:function(e)
    {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.value
      })
    }
  }
})
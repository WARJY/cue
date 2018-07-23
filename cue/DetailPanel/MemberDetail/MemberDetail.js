// Matrix_Wx/Details/InfoDetail/InfoDetail.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "default"
    },
    value: {
      type: Object,
      value: {},
      observer: 'getValue'
    },

    path: {
      type: String,
      value: 'Member.Parent'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    favor: null,
    siteUrl: app.siteUrl,
    IsSelf: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue(val) {
      if (val) {
        if (val.Id) {
          let token = app.getToken();
          let IsSelf = token && token.Parent.Id === val.Id;
          this.setData({ IsSelf: IsSelf })
          console.log(IsSelf);
          if (this.properties.path) {
            app.post(this.properties.path + '.Watch.GetList', {
              MemberId: val.Id,
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

        }
      }
    },
    onFav: function (e) {
      if (this.properties.path) {
        if (this.data.favor) {
          app.post(this.properties.path + '.Watch.delete', {
            Id: this.data.favor.Id
          }).then(data => {
            this.setData({
              favor: null
            });
            wx.showToast({
              title: "已取消关注"
            })
          })
        } else {
          app.post(this.properties.path + '.Watch.add', {
            MemberId: this.properties.value.Id
          }, true).then(data => {
            this.setData({
              favor: data
            });
            wx.showToast({
              title: "关注成功"
            })
          }).catch(e => {
            this.setData({

            })
          })
        }
      }
    },

    _handleMessage: function (e) {
      wx.navigateTo({
        url: '/pages/message/chat/chat',
      })
    }
  }
})
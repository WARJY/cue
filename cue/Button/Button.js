// Matrix_Wx/Button/Button.js
const app = getApp()
const types = {
  "AddFriend": {
    method: 'member.self.friend.apply'
  },
  "AddFriendText": {
    method: 'member.self.friend.apply'
  },
  "SendMessage": {
    init: function(page, Id) {
      let token = app.getToken();
      if (token && token.Parent) {
        if (Id > 0) {
          app.post(page.properties.name + '.self.friend.getlist', {
            MemberId: Id,
            Page: 1,
            PageSize: 1
          }).then(data => {
            if (data.Items.length > 0) {
              page.data.Friend = data.Items[0];
              if (page.data.Friend.State === 1) {

              } else if (page.data.Friend.State === 2) {
                page.setData({
                  title: '等待好友审核'
                })
              } else if (page.data.Friend.State === 3) {
                page.data.Friend = null;
                page.setData({
                  title: '加好友',
                  type: 'AddFriendText'
                })
              }
            } else {
              page.data.Friend = null;
              page.setData({
                title: '加好友',
                type: 'AddFriendText'
              })
            }
          }).catch(e => {
            app.showError(e);
          })
        }
      }
    },
    invoke: function(page, Id) {
      let token = app.getToken();
      if (!token || !token.Parent) {
        wx.navigateTo({
          url: '/pages/my/my',
        })
      } else {
        if (page.data.Friend && page.data.Friend.State ===1) {
          app.post(page.properties.name + '.self.message.getlist', { MemberId :Id}).then(data=>{
            if(data.Items.length>0){
              wx.navigateTo({
                url: '/pages/message/chat/chat?id=' + data.Items[0].Id,
              })
            }else{
              app.post(page.properties.name + '.self.message.AddTopic', { ParentId: Id }).then(data => {
                wx.navigateTo({
                  url: '/pages/message/chat/chat?id=' + data.Id,
                })

              }).catch(e=>{ app.showError(e)})
            }
          }).catch(e => { app.showError(e) })
         
        }
      }
    }
  }
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    image: {
      type: String,
      value: ''
    },
    image_background_color: {
      type: String,
      value: '#fff'
    },
    image_border_radius: {
      type: String,
      value: '50%'
    },
    item: {
      type: Object,
      value: {},
      observer: 'OnSetItem'
    },
    itemid: {
      type: String,
      value: 'ActId'
    },
    action: {
      type: String,
      value: ""
    },
    name: {
      type: String,
      value: "member"
    },
    Url: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalAddFriendOn: false
  },

  /**
   * 组件的方法列表
   */
  ready: function() {

  },

  methods: {
    OnSetItem: function(val) {
      if (val && val[this.properties.itemid] > 0) {
        let Id = val[this.properties.itemid];
        let Act = types[this.properties.type];
        if (Act && Act.init) {
          Act.init(this, Id);
        }
      }

    },
    goScan: function() {
      wx.scanCode({
        success: (res) => {
          wx.showModal({
            title: '扫描内容',
            content: res.result,
          })
        },
        fail: (res) => {
          console.log("错误");
        }
      })
    },
    _handleSendMessage: function(e) {
      console.log(e);
      if (this.properties.item && this.properties.item[this.properties.itemid] > 0) {
        let Id = this.properties.item[this.properties.itemid]
        let Act = types[this.properties.type];
        if (Act && Act.invoke) {
          Act.invoke(this, Id);
        }
      }
    },
    _handleAddFriend: function(e) {
      let item = this.properties.item;
      let token = app.getToken();
      if (!token) return;
      if (!item[this.properties.itemid]) return;
      if (parseInt(item[this.properties.itemid]) === token.Parent.Id) {
        wx.showModal({
          title: '不能添加自己为好友'
        })
        return
      }
      this.setData({
        modalAddFriendOn: true,
        item: item
      })
    },
    _commit: function(e) {
      let action = types[this.properties.type].method || this.properties.action;
      let input = e.detail.input;
      app.post(action, {
        MemberId: this.properties.item[this.properties.itemid],
        Message: input
      }).then(data => {
        console.log(data)
        if (data.Id) {
          this.setData({
            modalAddFriendOn: false
          })
          wx.showToast({
            title: '发送成功',
          })
        }
      }).catch(e => {
        app.showError(e)
      })
    },
    _handleEdit: function(e) {
      wx.navigateTo({
        url: '/pages/my/person/person',
      })
    }
  }
})
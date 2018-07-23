let app = getApp()
let self;

Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    value: {
      type: Object,
      observer: 'OnSetValue'
    },
    quickItems: {
      type: Array,
      value: []
    },
    params: {
      type: Object,
      value: {}
    },
    name: {
      type: String,
      value: "Member"
    },
    contentname: {
      type: String,
      value: "Content"
    },
    placeholder: {
      type: String,
      value: ""
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    Items: [],
    LastTime: undefined,
    More: true,
    Top: 0
  },

  methods: {
    End: function(e) {
      //console.log(e)
    },
    Scroll: function(e) {
      //console.log(e)
    },
    onLoadLast: function(e) {
      if (this.data.Items && this.data.Items.length > 0) {
        let lastOne = this.data.Items[0];
        app.post(this.properties.name + '.self.message.chat.getlist', {
          ParentId: this.properties.value.Id,
          GetMember: true,
          GetCache: false,
          CreateTimeLt: lastOne.CreateTime,
          Page: 1,
          PageSize: 10
        }, true).then(data => {
          if (data.Items.length > 0) {
            this.data.LastTime = new Date();
            for (let i = 0; i < data.Items.length; i++) {
              let item = data.Items[i];
              item.ShowTime = true;
              if (item.Member && item.Member.FaceImage) {
                if (item.Member.FaceImage.indexOf('http') === -1) item.Member.FaceImage = app.siteUrl + item.Member.FaceImage;
              }
              if (this.data.Items.length > 0 && new Date(item.CreateTime).getTime() - new Date(this.data.Items[0].CreateTime).getTime() < 60000) {
                this.data.Items[0].ShowTime = false;
              }
              this.data.Items.unshift(item);
            }
            this.setData({
              Items: this.data.Items,
              LastId: 'C' + this.data.Items[0].Id
            })
            if (data.Items.length < 10) this.setData({
              More: false
            })
          } else {
            this.setData({
              More: false
            })
          }
        })

      }
    },
    ScrollToBottom:function(e){
      
    },
    load: function(Id) {
      app.post(this.properties.name + '.self.message.chat.getlist', {
        ParentId: this.properties.value.Id,
        GetMember: true,
        CreateTimeBq: this.data.LastTime || '',
        Page: 1,
        PageSize: 10
      }, true).then(data => {
        if (data.Items.length > 0) {
          this.data.LastTime = new Date();
          for (let i = data.Items.length - 1; i >= 0; i--) {
            let item = data.Items[i];
            item.ShowTime = true;
            if (item.Member && item.Member.FaceImage) {
              if (item.Member.FaceImage.indexOf('http') === -1) item.Member.FaceImage = app.siteUrl + item.Member.FaceImage;

            }
            if (this.data.Items.length > 0 && new Date(item.CreateTime).getTime() - new Date(this.data.Items[this.data.Items.length - 1].CreateTime).getTime() < 60000) {
              item.ShowTime = false;
            }
            this.data.Items.push(item);
          }
          this.setData({
            Items: this.data.Items,
            LastTime: this.data.LastTime,
            LastId: 'B'+this.data.Items[this.data.Items.length-1].Id
          });
        }
      })
      setTimeout(() => {
        this.load()
      }, 60000)
    },
    OnSetValue: function(val) {
      if (val && val.Id > 0) {
        let token = app.getToken();
        if (token && token.Parent) {
          self = token.Parent;
          if (self.FaceImage) {
            if (self.FaceImage.indexOf('http') === -1) self.FaceImage = app.siteUrl + self.FaceImage;
          }
          this.setData({
            Self: token.Parent.Id
          })
        }
        this.load();
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
      let token = app.getToken();

      let content = this.data.reply
      let FormId = e.detail.formId||'';
      if (!content) return;
      if (content.length > 140) return app.showError('文字数量不能超过140个字');
      if (this.properties.name) {
        let params = Object.assign({}, this.properties.params, {
          [this.properties.contentname]: content,
          FormId: FormId,
          ParentId: this.properties.value.Id
        })
        app.post(this.properties.name + '.self.message.chat.add', params, true).then(data => {
          this.data.LastTime = data.CreateTime,
          data.Member = self;
          this.data.Items.push(data);  
          this.setData({
            Items: this.data.Items,
            LastTime: this.data.LastTime,
            LastId: 'B' + this.data.Items[this.data.Items.length - 1].Id
          });
          this.triggerEvent('commit', data);
        })
        this.setData({
          reply: ''
        })
      }
    },
    _close: function(e) {
      this.setData({
        showComment: false
      })
    }
  }
})
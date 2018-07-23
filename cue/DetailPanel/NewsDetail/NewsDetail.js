// Matrix_Wx/NewsDetail/NewsDetail.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: Object, value: {}, observer: 'getValue' },
    showImages: { type: Boolean, value: false },
    showKeywords: { type: Boolean, value: true },
    showHtml: { type: Boolean, value: true },
    name: { type: String }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue: function (val) {
      let foo = function (str) {
        let data = [];
        //匹配src属性
        var arr = str.match(/<img.*?(?:>|\/>)/gi);
        if (arr) {
          for (var i = 0; i < arr.length; i++) {
            var src = arr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            //获取图片地址
            if (src[1]) {
              data.push(src[1].indexOf('http') === -1 ? app.siteUrl + src[1] : src[1]);
            }
          }
        }
        return data;
      }
      if (val) {
        if (val.Keywords) {
          let keywords = [];
          let sps = [',', '，', '.', '。'];
          for (let i in sps) {
            if (val.Keywords.indexOf(sps[i]) > -1) {
              val.Keywords.split(sps[i]).map(item => {
                if (item) keywords.push(item);
              });
            }
          }
          val.Keywords = keywords;
          if (this.properties.showImages && val.CurrentHtml.Text) {
            val.Images = foo(val.CurrentHtml.Text);
          }
        }
        this.setData({ data: val });
      }
    },
    onShowImageList: function (e) {
      for (var i = 0; i < this.data.value.Images.length; i++) {
        let f = this.data.value.Images[i];
        if (f.indexOf('http') === -1) f = app.siteUrl + f;
      }
      // //图片预览
      wx.previewImage({
        current: this.data.value.Images[0], // 当前显示图片的http链接
        urls: this.data.value.Images // 需要预览的图片http链接列表
      })
    },
    gotosearch: function (e) {
      console.log(e);
      wx.navigateTo({
        url: `/pages/${this.properties.name}/${this.properties.name}List?Keywords=${e.currentTarget.dataset.keywords}`
      })
    }
  }
})

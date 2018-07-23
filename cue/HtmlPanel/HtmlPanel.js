// Matrix_Wx/HtmlPanel/HtmlPanel.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: String, value: '', observer: 'getValue' },
    clearImage: { type: Boolean, value: false },
    clearStyle: { type: Boolean, value: true }
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
      if (this.properties.clearStyle) {
        val = val.replace(/<p[^>]*>/gi, '<p>');
        val = val.replace(/>\s*/gi, '>');
      }
      if (this.properties.clearImage === true) {
        val = val.replace(/<\s?img[^>]*>/gi, '');
        val = val.replace(/<p>\&nbsp;<\/p>/gi, '');
        val = val.replace(/<p><br\/><\/p>/gi, '');
      } else {
        val = val.replace(/src=\"\//gi, `src="${app.siteUrl}`);
        val = val.replace(/<img/gi, '<img style="max-width:95%;height:auto;" ');
      }
      val = val.replace(/<p>/gi,'<p style="margin-top:20px">');
      this.setData({ nodes: val });
    }
  },
  ready() {

  }
})

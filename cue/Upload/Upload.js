// Matrix_Wx/Upload/Upload.js

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "图片上传"
    },
    path: {
      type: String,
      value: ""
    },
    fields: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      value: "default"
    },
    value:{
      type:Object,
      value:{},
      observer: 'OnSetValue'
    },
    uploadImg:{
      type: String,
      value: "/res/images/user_card.png"
    },
    uploadDesc:{
      type: String,
      value: "请保证名片信息清晰可见"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ImgList: [],
    currentImage: 0,
    canChoose: true,
    successList:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
 
    OnSetValue:function(val){
      let ImgList = []
      let successList = []
      if(val){
        for(let v in val){
          if (val[v] && val[v]!==undefined){
            ImgList.push(val[v].indexOf("http") === -1 ? app.siteUrl + val[v] : val[v])
            successList.push(true)
          }
        }
      }
      // console.log(ImgList)
      // console.log(successList)
      this.setData({
        ImgList: ImgList,
        successList: successList
      })
    },
    _chooseImg: function(e) {
      console.log(this.properties.uploadDesc)

      if (!this.data.canChoose) return
      wx.chooseImage({
        count: this.properties.fields.length - this.data.ImgList.length,
        success: (res) => {
          let imgSrc = res.tempFilePaths
          let ImgList = this.data.ImgList.concat(imgSrc)
          this.data.ImgList = ImgList
          this.setData({
            ImgList: ImgList,
            canChoose: false
          })
          this.triggerEvent('uploadOn', {
            field: this.properties.fields[this.data.currentImage]
          })
          let upload = (len) => {
            if (len > 0) {
              wx.uploadFile({
                url: app.siteUrl + "invoke?method=" + this.properties.path,
                filePath: this.data.ImgList[this.data.currentImage],
                name: this.properties.fields[this.data.currentImage],
                success: (e) => {
                  let url = ""
                  if (e.data) url = JSON.parse(e.data).url
                  this.triggerEvent('upload', {
                    [this.properties.fields[this.data.currentImage]]: url
                  });
                  this.setData({
                    ['successList[' + this.data.currentImage + ']']:true
                  })
                  this.data.canChoose = true
                  if(len-1 > 0) this.data.currentImage += 1
                  upload(len - 1)
                }
              })
            }else{
              this.data.currentImage += 1
            }
          }
          upload(imgSrc.length)
        }
      })
    },
    _changeImg: function(e) {
      let index = e.currentTarget.dataset.index
      if (!this.data.canChoose) return
      wx.chooseImage({
        count: 1,
        success: (res) => {
          this.setData({
            ['successList[' + index + ']']: false
          })
          let imgSrc = res.tempFilePaths[0]
          let ImgList = this.data.ImgList
          ImgList[index] = imgSrc
          this.data.ImgList = ImgList
          this.setData({
            ImgList: ImgList,
            canChoose: false
          })
          this.triggerEvent('uploadOn', {
            field: this.properties.fields[index]
          })
          wx.uploadFile({
            url: app.siteUrl + "invoke?method=" + this.properties.path,
            filePath: imgSrc,
            name: this.properties.fields[index],
            success: (e) => {
              let url = ""
              if (e.data) url = JSON.parse(e.data).url
              this.triggerEvent('upload', {
                [this.properties.fields[index]]: url
              });
              this.data.canChoose = true
              this.setData({
                ['successList[' + index + ']']: true
              })
            }
          })
        }
      })
    },
    OnTap: function() {
      var ImgList = this.data.ImgList;
      wx.setStorageSync(ImgList, ImgList)
    }
  }
})
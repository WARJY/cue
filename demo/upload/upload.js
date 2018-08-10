// demo/upload/upload.js
Page({
  data: {
    fields:["image"]
  },

  handleUpload:function(e){
    console.log(e.detail)
  }
})
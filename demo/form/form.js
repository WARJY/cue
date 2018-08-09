// demo/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Items: [{
      type: "text",
      label: "标题",
      placeholder: "请输入",
      name: "Title",
      request: true
    },
    {
      type: "section",
      label: "性别",
      placeholder: "请选择",
      name: "Male",
      array:["男","女"],
      request: true
    },
    {
      type: "select",
      label: "合作行业",
      placeholder: "请选择",
      name: "InfoTrade",
      request: true,
      path: '',
      selects: [
        { Id: 1, Name: "IT/互联网" },
        { Id: 2, Name: "主播" },
        { Id: 3, Name: "销售" },
      ]
    },
    {
      type: "number",
      label: "手机号码",
      placeholder: "请输入",
      name: "Mobile",
      request: true,
      check: "phone"
    },
    {
      type: "date",
      label: "有效时间",
      placeholder: "请输入",
      name: "ActiityTime",
      request: true,
      className: "nb"
    },
    {
      type: "textArea",
      title: "我们提供",
      placeholder: "请输入我们提供的详细描述...",
      name: "SupplyText",
      request: true,
      maxLength: 200
    },
    {
      type: "upload",
      title: "图片",
      name: "img",
      label: "图片",
      path: " ",
      fields: ["Image", "Image2", "Image3"],
      count: 1
    }
    ]
  },

  handleCommit:function(e){
    console.log(e.detail)
  }
})
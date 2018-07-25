// demo/searchPanel/searchPanel.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SearchPanel: [
      {
        title: "行业", name: "InfoTrade", load: false, path: " "
      },
      {
        title: "地区", name: "InfoCity", load: false, path: " "
      }
    ],
    SearchParams: [
      [
        { Id: 0, Name: "全部" },
        { Id: 1, Name: "IT/互联网" },
        { Id: 2, Name: "教育" },
        { Id: 3, Name: "软件" },
        { Id: 4, Name: "公务员" },
        { Id: 5, Name: "建筑" },
        { Id: 6, Name: "饮食" },
      ],
      [
        { Id: 0, Name: "全部" },
        { Id: 1, Name: "北京" },
        { Id: 2, Name: "重庆" },
        { Id: 3, Name: "上海" },
        { Id: 4, Name: "深圳" },
        { Id: 4, Name: "杭州" },
        { Id: 4, Name: "日本" },
      ]
    ]
    
  },

  handelSearchPanel: function (e) {
    console.log(e.detail)
  }
})
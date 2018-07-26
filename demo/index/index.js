//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShow: false,
    items: [{
      src: '/images/icon.png',
      title: 'Page',
      url: "/demo/page/page"
    }, {
      src: '/images/icon.png',
      title: 'AccountPanel',
      url: "/demo/accountPanel/accountPanel"
    }, {
      src: '/images/icon.png',
      title: 'Banner',
      url: "/demo/banner/banner"
    }, {
      src: '/images/icon.png',
      title: 'Menu',
      url: "/demo/menu/menu"
    }, {
      src: '/images/icon.png',
      title: 'Search',
      url: "/demo/search/search"
    }, {
      src: '/images/icon.png',
      title: 'Input',
      url: "/demo/input/input"
    }, {
      src: '/images/icon.png',
      title: 'Form',
      url: "/demo/form/form"
    }, {
      src: '/images/icon.png',
      title: 'List',
      url: "/demo/list/list"
    }, {
      src: '/images/icon.png',
      title: 'SearchPanel',
      url: "/demo/searchPanel/searchPanel"
    }, {
      src: '/images/icon.png',
      title: 'TabPanel',
      url: "/demo/tabPanel/tabPanel"
    }]
  },

  onLoad: function () {
    setTimeout(() => {
      this.setData({
        isShow: true
      })
    }, 1000)
  },

  GoDetail: function (e) {
    console.log(e.detail)
  }

})

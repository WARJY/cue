Component({
  behaviors: [],
  properties: {
    confirm: { type: String, value: '搜索' },
    cancle: { type: String, value: '' },
    placeholder: { type: String, value: '' },
    searchOn: { type: Boolean, value: false },
    searchDetail: { type: Boolean, value: false },
    defaultCity: { type: String, value: '' },
    guessItems: { type: Array, value: [] },
    city: { type: Boolean, value: false },
    cityObj_AI: { type: Array, value: [] },
    cityObj_JR: { type: Array, value: [] },
    cityObj_SZ: { type: Array, value: [] },
    history: { type: Boolean, value: false },
    historyItems: { type: Array, value: [] },
    hotCity: { type: Array, value: [] },
    keywords: { type: String, value: '' },
    cityOn: { type: Boolean, value: false },
    pagelink: { type: String, value: '' },
    matchingItems: { type: Array, value: [] }
  },

  // 私有数据，可用于模版渲染
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "",
    cityArr: [],
    src: './dw.png',
    keywords: '',
    cityOn: '',
    searched: false
  },

  ready: function () {
    this.setData({
      cityOn: this.properties.cityOn
    })
  },

  methods: {
    _searchOn: function (e) {
      this.triggerEvent('searchOn', { pagelink: this.properties.pagelink }, {})
    },
    _searchOff: function (e) {
      this.triggerEvent('searchOff')
    },
    _cityOn: function (e) {
      this.setData({
        cityOn: true
      })
    },
    _keywordsInput: function (e) {
      this.setData({
        keywords: e.detail.value
      })
      let myEventDetail = {
        keywords: e.detail.value,
        target: this
      }
      this.triggerEvent('keywordsInput', myEventDetail, {})
    },
    _goList: function (e) {
      let myEventDetail = {}
      let keywords = { keywords:""}
      if (e.currentTarget.dataset.keywords) {
        keywords.keywords = e.currentTarget.dataset.keywords
      } else {
        keywords.keywords = this.data.keywords
      }
      this.triggerEvent('goListByKey', keywords, {});
      this.setData({
        keywords: keywords.keywords,
        searchDetail: false,
        matchingItems: [],
        searched: true
      })
    },
    _goCityList: function (e) {
      let city = e.currentTarget.dataset.text;
      let myEventDetail = {
        city: city
      }
      this.setData({
        defaultCity: city,
        cityOn: false
      })
      this.triggerEvent('goListByCity', myEventDetail, {})
    },
    _goConfirm: function (e) {
     let myEventDetail = {
        keywords: this.data.keywords
      }
      this.triggerEvent('goListByKey', myEventDetail, {})
    },
    _clearHistory: function (e) {
      this.triggerEvent('clearHistory', {}, {})
    }
  }
})
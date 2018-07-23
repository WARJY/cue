Component({
  behaviors: [],

  properties: {
    type: {
      type: String,
      value: 'text'
    },
    title: {
      type: String,
      value: ''
    },
    className: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入手机号'
    },
    btn: {
      type: String,
      value: '获取验证码'
    },
    timeOut: {
      type: Number,
      value: 60
    },
    customItem: {
      type: String,
      value: ''
    },
    fields: {
      type: String,
      value: 'day'
    },
    start: {
      type: String,
      value: '1945-10-1'
    },
    end: {
      type: String,
      value: new Date().getTime()
    },
    array: {
      type: Array,
      value: []
    },
    maxLength: {
      type: Number,
      value: ''
    },
    value: {
      type: null,
      value: '',
      observer: "OnSetValue"
    },
    isSend: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    matchingItems: {
      type: Array,
      value: []
    },
    action: {
      type: String,
      value: ""
    },
    selects: {
      type: Array,
      value: []
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    isSend: false,
    timeOut: 0,
    count: 0,
    SearchOn: false,
    ShowTextArea: true
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {},
  moved: function() {},
  detached: function() {},

  methods: {
    OnSetValue: function(val) {
      //console.log(val)
      if (val) {
        if (this.properties.type === 'textArea') {
          this.setData({
            count: val.length,

          })
        }
      }
      //this.setData({value:val})
    },
    _inputChange: function(e) {
      if (this.data.count < this.properties.maxLength) {
        this.setData({
          count: e.detail.value.length
        })
      }
      let name = e.currentTarget.dataset.name;
      let val = e.detail.value;
      let myEventDetail = {
        name: name,
        value: val
      }
      this.triggerEvent('MInput', myEventDetail)
    },
    _sendCode: function(e) {
      let that = this;
      this.setData({
        isSend: true,
        timeOut: this.properties.timeOut
      })
      let fun = function() {
        if (that.data.timeOut > 0) {
          that.setData({
            timeOut: that.data.timeOut - 1
          })
        } else {
          that.setData({
            isSend: false
          })
        }
        setTimeout(fun, 1000)
      }
      setTimeout(fun, 1000)

      this.triggerEvent('sendCode', {}, {})
    },
    _bindPickerChange: function(e) {
      this.setData({
        value: e.detail.value
      })
      let name = e.currentTarget.dataset.name;
      let val = e.detail.value;
      let myEventDetail = {
        name: name,
        value: val
      }
      this.triggerEvent('MInput', myEventDetail)
    },
    _bindSectionChange: function(e) {
      let index = parseInt(e.detail.value)
      this.setData({
        value: index
      })
      let name = e.currentTarget.dataset.name
      let val = this.properties.array[index]
      let myEventDetail = {
        name: name,
        value: val,
        index: index
      }
      this.triggerEvent('MInput', myEventDetail)
    },
    _handeleSearchOn: function(e) {
      this.setData({
        SearchOn: true
      })
      this.triggerEvent("SearchOn",{target:this})
    },
    _handleKeywords: function(e) {
      let myEventDetail = {
        name: this.data.name,
        value: e.detail.keywords,
        target: e.detail.target
      }
      this.setData({
        value: e.detail.keywords
      })
      this.triggerEvent('MInput', myEventDetail)
    },
    _handleSearch: function(e) {
      let myEventDetail = {
        name: this.data.name,
        value: e.detail.keywords
      }
      this.setData({
        SearchOn: false,
        value: e.detail.keywords
      })
      this.triggerEvent('search', myEventDetail)
    },
    _handleSearchOff: function(e) {
      this.setData({
        SearchOn: false
      })
    },
    _close: function(e) {
      this.setData({
        SearchOn: false
      })
      this.triggerEvent('SearchOff')
    },
    _handleSelect: function(e) {
      let item = e.currentTarget.dataset.item;
      let name = this.properties.name;
      let myEventDetail = {
        name: name,
        value: item.Name,
        item: item
      }
      this.setData({
        value:item
      })
      this.triggerEvent('select', myEventDetail)
      this.triggerEvent('SearchOff')
    }
  }
})
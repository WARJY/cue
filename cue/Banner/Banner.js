Component({
  externalClasses: ['my-class'],
  behaviors: [],
  properties: {
    Items: { type: Array, value: '' },
    height: { type: Number, value: '' },
  },

  // 私有数据，可用于模版渲染
  data: {

  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {},
  moved: function () { },
  detached: function () { },

  methods: {

  }
})
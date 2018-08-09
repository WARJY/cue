Component({
  properties: {
    Items: { type: Array, value: '' },
    height: { type: Number, value: '' },
    showPoint: {type:Boolean, value:true },
    autoplay: { type: Boolean, value: true },
    interval: { type: Number, value: 2000 },
    duration: { type: Number, value: 500 }
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
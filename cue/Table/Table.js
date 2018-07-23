// Matrix_Wx/Table/Table.js
const themes={
  Default:{
    font_color:'#fff'
  }
}
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    name: { type: String, value: '' },
    type: { type: String, value: 'text' },
    value: { type: Array, value: [] },
    title: { type: String, value: "" },
    theme: { type: String, value: 'Default' },
    imageWidth: { type: 'String', value: '320' },
    imageHeight: { type: 'String', value: '200' },
 
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme:{}
  },

  methods: {

  },
  ready()
  {
    this.setData({
      currentTheme: themes[this.properties.theme]
    })
   
  }
})
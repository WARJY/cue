// Matrix_Wx/List/List.js 
const themes = {

}
Component({
  properties: {
    modalOn:{ type:Boolean, value:false },
    input:{ type:String, value:"" },
    title:{ type:String, value:""},
    placeholder: { type: String, value: "" },
    commit_text: { type: String, value: "" }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentTheme: {}
  },

  methods: {
    _input:function(e){
      this.setData({
        input:e.detail.value
      })
    },
    _close:function(){
      this.setData({
        modalOn:false
      })
    },
    _commit:function(){
      this.triggerEvent('commit', { input:this.data.input })
    }
  }
})
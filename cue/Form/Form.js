// Matrix_Wx/List/List.js 
const app = getApp();
const siteUrl = app.siteUrl
const CHECKS = {
  "empty": function (val, field) {
    if (val === undefined) return true
    if (val === "") return true
    return
  },
  "minLength": function (val, field) {
    let title = field.tip || field.title || field.label
    if (val.length < field.minLength) return title + "长度不能小于" + field.minLength
    return
  },
  "maxLength": function (val, field) {
    let title = field.tip || field.title || field.label
    if (val.length > field.maxLength) return title + "长度不能大于" + field.maxLength
    return
  },
  "min": function (val, field) {
    let title = field.tip || field.title || field.label
    if (val < field.min) return title + "不能小于" + field.min
    return
  },
  "max": function (val, field) {
    let title = field.tip || field.title || field.label
    if (val > field.max) return ftitle + "不能大于" + field.max
    return
  },
  "phone": function (val) {
    if (val.length !== 11 || parseInt(val.substr(0, 1)) !== 1) return "请输入正确的手机号码！"
    return
  }
}

Component({
  properties: {
    Items: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      value: "default"
    },
    original: {
      type: Object,
      value: {},
      observer: 'OnSetOriginal'
    },
    commit_text: {
      type: String,
      value: "保存"
    },
    path: {
      type: String,
      value: ""
    },
    method: {
      type: String,
      value: "Add"
    },
    params: {
      type: Object,
      value: {}
    },
    autologin: {
      type: Boolean,
      value: false
    },
    attachedComplete: {
      type: Boolean,
      value: false,
      observer: 'setInit'
    }
  },

  // 私有数据，可用于模版渲染
  data: {
    searchDetail: false,
    process: []
  },

  ready: function () {
    let color = app.color
    this.setData({
      color:color
    })
    let items = {} //参数对象
    let data = {} //绑定数据
    let value = {} //表单数据
    let process = []

    let foo = () => {
      this.properties.Items.map(item => {
        let name = item.name
        let type = item.type
        //构建参数对象
        items[name] = item
        //构建数据对象及表单数据对象
        if (type === "upload" && item.fields && item.fields.length > 0) {
          data[name] = {}
          item.fields.map(field => {
            data[name][field] = ""
            value[field] = ""
          })
        } else {
          data[name] = ""
          value[name] = ""
          if (item.defaultvalue) {
            data[name] = item.defaultvalue
            value[name] = item.defaultvalue
          }
        }
      })
      console.log(data)

      this.setData({
        items: items,
        data: data,
        value: value,
        attachedComplete: true,
        process: process
      })
      let result = this._check({ detail: value }, true);
      if (result.value) {
        return this.triggerEvent('formInput', {
          check: null,
          changed: true,
          data: result.value
        });
      } else {
        return this.triggerEvent('formInput', {
          check: result,
          changed: true,
          data: null
        });
      }
    }

    // this.properties.Items.map(item => {
    //   if (item.path && item.type === 'select') {
    //     process.push(new Promise((r, j) => {
    //       app.post(item.path, {
    //         GetCache: true,
    //         State: true
    //       }).then(data => {
    //         this.setData({
    //           selects: Object.assign({}, this.data.selects, {
    //             [item.name]: data.Items
    //           })
    //         })
    //         r(data)
    //       }).catch(e => {
    //         j(e)
    //       })
    //     }))
    //   }
    // })

    if (process.length > 0) {
      Promise.all(process).then(datas => {
        foo()
      }).catch(e => { })
    } else {
      foo()
    }
  },

  methods: {
    setInit: function (val) {
      if (val === true) {
        this.data.Init && this.data.Init();
        this.data.Init = null;
      }
    },
    // 监听value
    OnSetOriginal: function (newVal, oldVal) {
      if (newVal) {
        this.init(newVal);
      }
    },
    //初始化
    init: function (val) {
      let foo = () => {
        let data = {} //绑定数据
        let value = {} //表单数据

        this.properties.Items.map(item => {
          let name = item.name
          let type = item.type
          //构建数据对象及表单数据对象
          if (type === "upload" && item.fields && item.fields.length > 0) {
            data[name] = {}
            item.fields.map(field => {
              data[name][field] = ""
              value[field] = ""
              if (val[field] && val[field] !== undefined) {
                data[name][field] = val[field]
                value[field] = val[field]
              }
            })
          } else if (type === "select" && this.data.selects[item.name]) {
            data[name] = ""
            value[name] = ""
            let select = this.data.selects[item.name]
            if (val) {
              for (let i in select) {
                if (val[name] && val[name].Id === select[i].Id) {
                  let d = {
                    Id: select[i].Id,
                    Name: select[i][item.field || "Name"]
                  }
                  data[name] = d;
                  value[name] = d;
                }
              }
            } else {
              let d = {
                Id: 0,
                Name: ''
              }
              data[name] = d;
              value[name] = d;
            }
          } else {
            data[name] = ""
            value[name] = ""
            if (val[name] && val[name] !== undefined) {
              data[name] = val[name]
              value[name] = val[name]
            }
          }
        })
        // console.log(value)

        this.setData({
          data: data,
          value: value
        })
      }
      if (this.data.attachedComplete) {
        foo()
      } else {
        this.data.Init = () => {
          foo();
        };
      }
    },
    //处理输入
    _handleInput: function (e) {
      let name = e.detail.name
      let value = e.detail.value
      let type = this.data.items[name].type
      if (e.detail.item) value = e.detail.item
      //link
      for (let item in this.data.items) {
        if (this.data.items[item].link == name) {
          this.setData({
            ["value." + item]: this.data.items[item].expression(value),
            ["data." + item]: this.data.items[item].expression(value)
          })
        }
      }
      //upload
      if (type === "upload") {
        this.setData({
          ["value." + item]: value
        })
      } else if (type === 'search' && this.data.items[name].action) {
        let target = e.detail.target
        let action = this.data.items[name].action
        let field = this.data.items[name].field || "Name"
        app.SearchField(100, "", target, value, action, field)
      } else if (type === 'section' && this.data.items[name].array) {
        let index = parseInt(e.detail.index) + 1
        this.setData({
          ["value." + name]: index,
          ["data." + name]: index
        })
      } else {
        this.setData({
          ["value." + name]: value,
          ["data." + name]: value
        })
      }

      if (this.data.field != this.data.currentField) return;
      let result = this._check(e, true); //验证后的值
      if (result.value) {
        //值是否改变
        let changed = true;
        if (this.properties.original && this.properties.original.Id > 0) {
          changed = false;
          for (let name in result) {
            if (this.properties.original[name] && result[name]) {
              if (Object.prototype.toString.call(result[name]) === '[object Object]') {
                if (this.properties.original[name].Id !== result[name].Id) changed = true
              } else {
                if (this.properties.original[name] !== result[name]) changed = true
              }
            }
          }
        }
        return this.triggerEvent('formInput', {
          check: null,
          changed: changed,
          data: result.value
        });
      } else {
        return this.triggerEvent('formInput', {
          check: result,
          changed: false,
          data: null
        });
      }

    },
    // 数据验证
    _check: function (e, brokewhenerror) {
      let error = [];
      let value = {};

      for (let name in this.data.items) {
        let item = this.data.items[name]
        let title = item.tip || item.title || item.label
        switch (item.type) {
          case "select":
            if (this.data.value[name]) {
              value[name] = {
                Id: this.data.value[name].Id,
                Type: this.data.value[name].Type
              };
              if (item.request && !value[name].Id) {
                error.push("请选择" + title)
                if (brokewhenerror) return error
              }

            } else {
              if (item.request)
                error.push("请选择" + title)
              if (brokewhenerror) return error
            }
            break;
          case "upload":
            if (item.fields && item.fields.length > 0) {
              let uploaded = 0
              for (let i in item.fields) {
                let field = item.fields[i]
                if (field) {
                  if (CHECKS.empty(this.data.value[field])) {
                    if (uploaded < item.count) {
                      error.push(uploaded === 0 ? "请上传" + title : "至少上传" + item.count + "张图片")
                      if (brokewhenerror) return error
                    }
                  } else {
                    value[field] = this.data.value[field]
                    uploaded += 1
                  }
                }
              }
            } else {
              error.push("upload字段为空")
              if (brokewhenerror) return error
            }
            break
          default:
            value[name] = this.data.value[name];
            //判空
            if (CHECKS.empty(this.data.value[name])) {
              error.push("请输入" + title)
              if (brokewhenerror) return error
            }
            //长度
            let cs = ["minLength", "maxLength", "min", "max"];
            for (let c in cs) {
              let res = CHECKS[cs[c]](this.data.value[name], item)
              if (res) {
                error.push(res)
                if (brokewhenerror) return error
              }
            }
            //特殊类型
            if (item.check) {
              if (CHECKS[item.check]) {
                let res = CHECKS[item.check](this.data.value[name])
                if (res) {
                  error.push(res)
                  if (brokewhenerror) return error
                }
              }
            }
        }
      }
      return {
        value: value,
        error: error
      }
    },
    //提交
    _goCommit: function (e) {
      if (this.data.field !== this.data.currentField && this.data.field !== "") return;
      let result = this._check(e, true); //验证后的值
      console.log(result)
      if (Array.isArray(result)) {
        wx.showModal({
          title: result[0]
        });
        return;
      }
      result = result.value;
      //值是否改变
      let changed = true;
      if (this.properties.original && this.properties.original.Id > 0) {
        changed = false;
        for (let name in result) {
          if (this.properties.original[name] && result[name]) {
            if (Object.prototype.toString.call(result[name]) === '[object Object]') {
              if (this.properties.original[name].Id !== result[name].Id) changed = true
            } else {
              if (this.properties.original[name] !== result[name]) changed = true
            }
          }
        }
      }
      if (!changed)
        return this.triggerEvent('formCommit', {
          result: result,
          changed: false
        });
      if (this.properties.path) {
        let method = this.properties.path + '.' + (!this.properties.original || !this.properties.original.Id ? 'Add' : 'Modify')
        let Id = {
          Id: this.properties.original && this.properties.original.Id ? this.properties.original.Id : 0
        }
        let value = result;
        let params = this.properties.params
        let formId = {
          FormId: e.detail.formId
        }
        this.triggerEvent('formCommit', {
          result: Object.assign(Id, value, params, formId),
          todo: (!this.properties.original || !this.properties.original.Id ? 'Add' : 'Modify')
        })
      } else {
        this.triggerEvent('formCommit', {
          result: result,
          todo: (!this.properties.original || !this.properties.original.Id ? 'Add' : 'Modify')
        });
      }
    },
    _handleUploadOn: function (e) {
      this.data.imgField = e.detail.field
    },
    _handleUpload: function (e) {
      let currentField = ""
      for (let key in e.detail) {
        currentField = key
      }
      // console.log(currentField + "上传完成")
      this.data.currentImgField = currentField
      this.setData({
        value: Object.assign({}, this.data.value, e.detail)
      })
    },
    _handleSearchOn: function (e) {
      this.setData({
        searchDetail: true
      })
    },
    _handleSearchOff: function (e) {
      this.setData({
        searchDetail: false
      })
    },
    _close: function (e) {
      this.triggerEvent('formCancel')
    }
  }
})
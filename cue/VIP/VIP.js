// Matrix_Wx/UserInfo/UserInfo.js
var app = getApp();

Component({
  properties: {
    name: {
      type: String,
      value: '黄金会员'
    },
    description: {
      type: String,
      value: '黄金会员有各种各样的福利，可提高每日关注量、加好友量、好友总数等'
    },
    price: {
      type: Number,
      value: 200
    },
    periods:{
      type:String,
      value:"月"
    },
    unit: {
      type: String,
      value: '元'
    },
    value: {
      type: Object,
      observer: 'onSetValue'
    },
    icon: {
      type: String,
      value: '/images/mine/hy-full.png'
    },
    fieldtime: {
      type: String,
      value: 'VIPDate'
    },
    fieldtotal: {
      type: String,
      value: 'BDC'
    },
    fieldstate: {
      type: String,
      value: 'IsVIP'
    },
    quotation: {
      type: Array,
      value: [{
        Title: '一个月',
        Price: '98',
        Description:'赠送1000BDC',
        Type:'2'
      }, {
        Title: '三个月',
        Price: '198',
        Description: '赠送2000BDC',
        Type: '3'
      }, {
        Title: '半年',
        Price: '398',
        Description: '赠送5000BDC',
        Type: '4'
      }, {
        Title: '一年',
        Price: '598',
        Description: '赠送8000BDC',
        Type: '5'
      }]
    },
    path: {
      type: String
    }
  },

  data: {
    isBuying: false,
    CurrentItem:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBuy: function(e) {
      this.setData({
        isBuying: true
      })
    },
    handleBuy:function(e){
      let currentItem = this.data.CurrentItem
      if(!currentItem) return app.showError("请选择要充值的套餐")
      // if (parseInt(currentItem.Price) > parseInt(this.properties.value[this.properties.fieldtotal])) return app.showError("余额不足，请充值")

      let qty = parseInt(1)
      let cost = parseInt(currentItem.Price)
      let FormId = e.detail.formId
      app.post(this.properties.path + ".Self.Order.Add", { Title: currentItem.Type, Qty: qty, Cost: cost, FormId: FormId}).then(data => {
        if (data.Id && data.Id > 0) {
          app.post('Member.Self.Payment.Add', {
            OrderId: data.Id
          }, true).then(payment => {
            if (payment.Id && payment.Id > 0) {
              let token = JSON.parse(payment.Token);
              console.log(token)
              wx.requestPayment({
                'timeStamp': token.timeStamp,
                'nonceStr': token.nonce_str,
                'package': `prepay_id=${token.package}`,
                'signType': token.signType,
                'paySign': token.paySign,
                'success': (res) => {
                  wx.setStorageSync('updateUser', 1);
                  wx.navigateBack({})
                  app.showInfo("支付成功")
                },
                'fail': (res) => {
                  app.showInfo("未完成支付")
                }
              })
            }
          }).catch(e => {
            app.showError(e)
          })      
        } else {
          app.showError("创建订单失败")
        }
      }).catch(e => {
      })
    },
    onSetValue: function(val) {
      if (val) {
        let time = new Date(val[this.properties.fieldtime]);
        console.log(time);
        if (Date.now() > time.getTime()) {
          this.setData({
            IsVIP: false
          });
        } else {
          this.setData({
            IsVIP: true
          });
        }
      }
    },
    selectItem:function(e){
      let index = e.currentTarget.dataset.index
      this.setData({
        CurrentItem: this.properties.quotation[index]
      })
    }
  },
  ready() {

  }

})
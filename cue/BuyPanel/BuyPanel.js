// Matrix_Wx/ButtonBuy/ButtonBuy.js
const themes = {
  default: {
    className: "btn-pay",
  },
  Bottom: {
    className: "btn-pay-bottom",
  },
}
const app = getApp();
let com;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { type: Object, value: { SaleTitle: '' }, observer: 'OnWatch' },
    name: { type: String },
    order: { type: Object },
    isshow: { type: Boolean, value: true },
    theme: { type: String, value: "default" },
    formvalue: { type: Object, value: {}, observer: 'OnFormValue' },
    onlyone: { type: Boolean, value: true },
    background:{type:String,value:""}
  },

  /**
   * 组件的初始数据
   */
  data: {
    Lock: false,
    currentTheme: {},
    Init: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnFormValue: function (value) {
      console.log(value);
    },
    merge: function () {

    },
    OnTap: function (e) {
      let CommodityId = e.currentTarget.dataset.id;
      let Name = e.currentTarget.dataset.name;
      if (com.data.Lock) { console.log(com.data.Lock); return; }
      let token = app.getToken();

      com.data.Lock = true;
      setTimeout(function () { if (com.data.Lock) com.data.Lock = false; }, 300);
      let Pay = (payment) => {
        return new Promise((r, j) => {
          let token = JSON.parse(payment.Token);
          wx.requestPayment(
            {
              'timeStamp': token.timeStamp,
              'nonceStr': token.nonce_str,
              'package': `prepay_id=${token.package}`,
              'signType': token.signType,
              'paySign': token.paySign,
              'success': function (res) {
                r(true);
              },
              'fail': function (res) {
                r(false);
              },
              'complete': function (res) { }
            })
        })
      }
      let AddOrder = () => {
        return new Promise((r, j) => {
          let data = { ParentId: CommodityId, Cost: com.properties.value.SalePrice, Qty: 1 };
          app.post(Name + '.' + app.userName + '.Order.Add', data, true)
            .then(data => {
              com.properties.order = data;
              PayOrder(data).then(d => { r(d); }).catch(err => { j(err); });
            }).catch(e => { j(e) })
        })
      }
      let TryAddOrder = () => {
        if (com.properties.order && com.properties.order.Id > 0) {
          return PayOrder(com.properties.order);
        } else {
          let token = app.getToken();
          if (!token) {
            //未登录的情况下重新获取订单列表
            return new Promise((r, j) => {
              app.post(Name + '.' + app.userName + '.Order.GetList', { ParentId: CommodityId, Page: 1, PageSize: 1, GetCache: false, Orders: ['IdDESC'] }, true).then(datas => {
                if (datas.Items.length > 0) {
                  let order = datas.Items[0];
                  if (order.State) {
                    //买了成功
                    com.properties.order = order;
                    if (this.properties.onlyone === true) {
                      r(true);
                    } else {
                      AddOrder().then(d => { r(d); }).catch(e => { j(e); });
                    }
                  } else {
                    //买了未付款
                    com.properties.order = order;
                    PayOrder(com.properties.order).then(d => { r(d); }).catch(err => { j(err); });
                  }
                } else {
                  AddOrder().then(d => { r(d); }).catch(e => { j(e); });
                }
              }).catch(e => { j(e) });
            })
          } else {
            return AddOrder();
          }
        }
      }

      let PayOrder = (Order) => {
        if (!Order.State) {
          if (this.properties.formvalue && this.properties.formvalue.value) {
            if (this.properties.formvalue.validate && this.properties.formvalue.validate.length > 0) {
              return Promise.reject(this.properties.formvalue.validate[0].message);
            }
            if (this.properties.formvalue.value) {
              return new Promise((r, j) => {
                console.log(Order.Id);
                app.post(Name + '.' + app.userName + '.Order.Modify', this.merge({ Id: Order.Id }, this.properties.formvalue.value), true)
                  .then(d => {
                    if (com.properties.payment && com.properties.payment.Id > 0) {
                      Pay(com.properties.payment).then(d => { r(d); }).catch(e => { j(e) });
                    } else {
                      app.post(Name + '.' + app.userName + '.Payment.Add', { ParentId: CommodityId, OrderId: Order.Id }, true)
                        .then(data => { com.properties.payment = data; Pay(data).then(datas => { r(datas); }).catch(err => { j(err); }); })
                        .catch(err => j(err))
                    }
                  }).catch(e => {
                    j(e);
                  })
              })
            }
          }
          else {
            if (com.properties.payment && com.properties.payment.Id > 0) {
              return Pay(com.properties.payment);
            } else {
              return new Promise((r, j) => {
                app.post(Name + '.' + app.userName + '.Payment.Add', { ParentId: CommodityId, OrderId: Order.Id }, true)
                  .then(data => { com.properties.payment = data; Pay(data).then(datas => { r(datas); }).catch(err => { j(err); }); })
                  .catch(err => j(err))
              })
            }
          }
        }
      }
      TryAddOrder().then(success => { com.Show(!success); }).catch(err => { app.showError(err.message || err); })
    },
    Show: function (isShow) {
      if (isShow) {
        this.triggerEvent('onpay', { order: false }, {});
        let d = {};
        d[`ShowBuyPanel${this.properties.name}`] = true;
        app.setData(d);
      } else {
        this.triggerEvent('onpay', { order: true }, {});
        let d = {};
        d[`ShowBuyPanel${this.properties.name}`] = false;
        app.setData(d);
      }
    },
    OnWatch: function (value) {
      if (!this.data.Init) { this.setData({ Init: true }); return value; }
      if (value) {
        let Id = value.Id;
        let Name = this.properties.name;
        if (Id > 0 && Name) {
          let token = app.getToken();
          if (token) {
            app.post(Name + '.' + app.userName + '.Order.GetList', { ParentId: Id, Page: 1, PageSize: 1, GetCache: false, Orders: ['IdDESC'] }).then(datas => {
              if (datas.Items.length > 0) {
                let order = datas.Items[0];
                if (order.State) {
                  //买了成功
                  if (this.properties.onlyone === true) { this.properties.order = order; this.Show(false); } else this.Show(true);
                } else {
                  //买了未付款
                  this.Show(true);
                  this.properties.order = order;
                }
              } else {
                this.Show(true);
              }
            }).catch(e => {
              this.Show(true);
            })
          } else {
            this.Show(true);
          }
        }
      }
    },
    merge: function () {
      let a = arguments[0];
      if (a) {
        for (let i = 1; i < arguments.length; i++) {
          let arg = arguments[i];
          if (arg) {
            for (let p in arg) {
              if (arg.hasOwnProperty(p)) a[p] = arg[p];
            }
          }
        }
      }
      return a;
    }
  },
  ready() {
    com = this;
    this.setData({
      currentTheme: themes[this.properties.theme]
    })
  }
})

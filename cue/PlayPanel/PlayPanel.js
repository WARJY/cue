// Matrix_Wx/PlayPanel/PlayPanel.js 
// Matrix_Wx/List/List.js 
let playAudio = wx.getBackgroundAudioManager();
playAudio.onPlay = function () {
  console.log('play')
  com.setData({ Playing: true });
}
playAudio.onPause = function () {
  console.log('pause')
  com.setData({ Playing: false });
}

playAudio.onTimeUpdate = function () {
  console.log('time')

}
const app = getApp();
let com;
Component({
  externalClasses: ['ImageClass'],
  behaviors: [],
  properties: {
    music: { type: Object, observer: 'setMusic' },
    order: { type: Object, value: {}, observer: "setOrder" },
    list: { type: Array, observer: "setList" },
    checkOrder: { type: Boolean, value: true },
    name: { type: String, value: '' }
  },

  // 私有数据，可用于模版渲染
  data: {
    currentPlayTime: 0,
    audioLen: 0,
    showList: false,
    playing: false,
    image: '',
    musicList: [],
    canplay: false,
    InitOrder: false,
    InitMusic: false,
  },

  methods: {

    setMusic: function (music) {
      this.data.InitMusic = true;
      if (music) {
        if (music.Image && music.Image.indexOf('http')) { music.Image = app.siteUrl + music.Image };
        if (music.Link && music.Link.indexOf('http')) { music.Link = app.siteUrl + music.Link };
        this.setData({ image: music.Image });
        playAudio.title = music.Title;
        this.goPlay();
      }
      return music;
    },
    setOrder: function (order) {
      this.data.InitOrder = true;
      this.goPlay();
    },
    setList: function (list) {
      if (list) {
        let list2 = []
        for (let i in list) {
          list2.push({
            Title: list[i].Title,
            Id: list[i].Id
          });
        }
        this.setData({ musicList: list2 })
      } else {
        this.setData({ musicList: [] })
      }
      return list;
    },
    goPrev: function () {
      this.goPause();
      if (this.properties.music) {
        let Id = this.properties.music.Id;
        if (Id > 0) {
          for (let i in this.properties.list) {
            if (this.properties.list[i].Id === Id) {
              i = parseInt(i);
              this.setData({ music: this.properties.list[(i > 0 ? i - 1 : 0)] });
            }
          }
        }
      }
    },
    goNext: function () {
      this.goPause();
      if (this.properties.music) {
        let Id = this.properties.music.Id;
        if (Id > 0) {
          for (let i in this.properties.list) {
            if (this.properties.list[i].Id === Id) {
              i = parseInt(i);
              this.setData({ music: this.properties.list[(i < this.properties.list.length - 1 ? i + 1 : this.properties.list.length - 1)] });
            }
          }
        }
      }
    },
    goPause: function () {
      playAudio.pause();
      this.setData({ playing: false })
    },
    goPlay: function () {
      if (this.properties.music) {
        if ((this.properties.checkOrder && this.data.InitOrder && this.properties.order)
          || (!this.properties.checkOrder) || this.properties.music.IsFree) {
          if (playAudio.src !== this.properties.music.Link) {
            playAudio.src = this.properties.music.Link;
            playAudio.title = this.properties.music.Title;
            playAudio.play();
            console.log('play');
            this.setData({ playing: true });
          } else {
            playAudio.play();
            console.log('play');
            this.setData({ playing: true });
          }
        } else {
          playAudio.pause();
          this.setData({ playing: false });
        }

        if (this.properties.checkOrder && this.data.InitOrder && !this.properties.order && !this.properties.music.IsFree) {
          this.triggerEvent('onpay', { order: false }, {});
          let d = {};
          d[`ShowBuyPanel${this.properties.name}`] = true;
          app.setData(d);
        }
      }
    },
    goList: function () {
      this.setData({ showList: true });
    },
    onSelectItem: function (e) {
      let Id = e.detail.id;
      if (Id > 0) {
        if (Id !== this.properties.music.Id) {
          for (let i in this.properties.list) {
            if (this.properties.list[i].Id === Id) {
              this.setData({ music: this.properties.list[i] });
            }
          }
        }
      }
      this.setData({ showList: false });
    },
    onTimeUpdate: function () {
      this.setData(
        {
          audioLen: Math.floor((playAudio.duration || 0) / 60) + ":" + ((playAudio.duration || 0) % 60 / 100).toFixed(2).slice(-2),
          currentPlayTime: Math.floor((playAudio.currentTime || 0) / 60) + ":" + ((playAudio.currentTime || 0) % 60 / 100).toFixed(2).slice(-2),
          audioPress: parseInt((playAudio.currentTime || 0) / (playAudio.duration || 1) * 100),
        }
      )
    },
      onShareAppMessage: function (res) {
        console.log(res)
          title: '自定义转发标题';
          path: '/pages/Lesson/Lesson'
      }
 
  },
  created() {
    com = this;
    let foo = () => {
      setTimeout(() => { this.onTimeUpdate(); foo() }, 1000);
    }
    foo();
  }
}) 
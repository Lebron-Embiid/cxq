import {
  qrCodeFileList,
  weseeAnalysis,
  queryVideoUrl
} from '../../api/qrCode.js'
Page({
  data: {
    url: "",
    urlLisr: [],
    index: 0
  },
  onLoad(options) {
    let data = wx.getStorageSync('params');
    console.log('扫码接收的参数'+data);
    queryVideoUrl({
      data: data
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          url: res.data[0]
        })
      }
    })
    return;
    if (options.data) {
      //解析url地址
      let newUrl = decodeURIComponent(options.data);
      //获取对应number参数
      let number = wx.getQueryString({
        url: newUrl,
        name: "number"
      });
      //请求接口
      this.queryVideo(number);
    } else {
      this.queryVideo(options.number);
    }
  },
  onUnload(){
    wx.removeStorageSync('params');
  },
  queryVideo(number) {
    qrCodeFileList({
      quickResponseCodeNumber: number
    }).then(res => {
      console.log()
      let newData = [];
      res.data.forEach(item => {
        if (item.weseeLink && item.weseeLink != "") {
          newData.push(item.weseeLink)
        }
      })
      weseeAnalysis(newData).then(
        response => {
          let newUrl = [];
          response.data.forEach(item => {
            if (item.videoLink && item.videoLink != "") {
              newUrl.push(item.videoLink)
            }
          });
          this.setData({
            urlLisr: newUrl,
            url: newUrl[0]
          });
        }
      )
    })
  },
  nextVideo() {
    if (this.data.index >= this.data.urlLisr.length - 1) {
      this.setData({
        index: 0,
        url: this.data.urlLisr[0]
      })
    } else {
      this.setData({
        index: this.data.index + 1,
        url: this.data.urlLisr[this.data.index + 1]
      })
    }
  },
  onClickLeft() {
    wx.redirectTo({
      url: '/pages/userInfo/index'
    })
  }
})
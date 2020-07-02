// pages/couponDetail/index.js
import {
  showUserQRCode,
  save_coupon_image,
  show_coupon_image,
  show_sell_coupon_image
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cert_id: '',
    src: '',
    save_src: '',
    user_code: '',
    is_buy: 0 //是否是购买进入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // src: options.src,
      cert_id: options.certId
    })
    if(options.buy){
      show_sell_coupon_image({
        certId: options.certId
      }).then((res)=>{
        const base64ImgUrl = "data:image/png;base64," + res.data;
        base64src(base64ImgUrl,options.certId,ress=>{
          this.setData({
            src: ress
          })
        })
      })
    }else{
      show_coupon_image({
        certId: options.certId
      }).then((res)=>{
        const base64ImgUrl = "data:image/png;base64," + res.data;
        base64src(base64ImgUrl,options.certId,ress=>{
          this.setData({
            src: ress
          })
        })
      })
    }
    
    save_coupon_image({
      certId: options.certId
    }).then((res)=>{
      this.setData({
        save_src: res.data
      })
    })
    console.log(options);
    this.getQrCode();
    if(options.type == 'buy'){
      this.setData({
        is_buy: 1
      })
    }
  },
  //获取二维码
  getQrCode(){
    showUserQRCode().then(res=>{
      const base64ImgUrl = "data:image/png;base64," + res.data;
      base64src(base64ImgUrl,1,ress=>{
        this.data.user_code = ress;
        this.setData({
          user_code: this.data.user_code
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(JSON.stringify(res))
    var that = this;
    return {
      imageUrl: that.data.src
    }
  },
  downloadImg(){
    var that = this;
    console.log(that.data.save_src)
    wx.showModal({
      title: '提示',
      content: '确定下载促销券图片？',
      success: function(res) {
        if(res.confirm){
          wx.downloadFile({
            url: that.data.save_src,
            success: (ress) => {
              if (ress.statusCode === 200) {
                console.log(ress.tempFilePath);
                wx.saveImageToPhotosAlbum({
                  filePath: ress.tempFilePath,
                  success: function () { 
                    publicFun.getToast('下载成功');
                  }
                })
              }
            },
            fail() {
              publicFun.getToast('下载失败');
            }
          })
        }
      }
    })
  }
})
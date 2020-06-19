// pages/couponDetail/index.js
import {
  showUserQRCode
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    user_code: '',
    is_buy: 0 //是否是购买进入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      src: options.src
    })
    console.log(options.type);
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
  onShareAppMessage: function () {

  }
})
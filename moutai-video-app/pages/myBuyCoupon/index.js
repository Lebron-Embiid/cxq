// pages/myBuyCoupon/index.js
import {
  query_useless_coupon_list
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,//0:可使用 1:无使用次数 2:过期 3:被删除
    page: 1,
    nav_list: ['可使用','已用完','已过期','已删除'],
    nav_active: 0,
    myBuyCouponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBuyCouponList();
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
  clickNav(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      nav_active: index,
      type: index
    })
    this.getMyBuyCouponList();
  },
  getMyBuyCouponList(){
    let data = {
      pageNum: this.data.page,
      pageSize: 20,
      type: this.data.type
    }
    query_useless_coupon_list(data).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            myBuyCouponList: res.data.records
          })
        }else{
          this.setData({
            myBuyCouponList: this.data.myBuyCouponList.concat(res.data.records)
          })
        }
      }
    })
  },
  toDetail(e){
    let couponId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/myBuyCouponDetail/index?id='+couponId
    })
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getMyBuyCouponList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
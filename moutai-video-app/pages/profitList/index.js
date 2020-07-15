// pages/profitList/index.js
import {
  agent_coupon_profit_list,
  seller_coupon_profit_list
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    date: '',
    tab_list: ["代理人","销售员"],
    activeIndex: 0,
    list: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var today = Y + '-' + M + '-' + D;
    this.setData({
      type: options.type,
      date: today
    })

    this.getAgentProfitList();
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
    let page = this.data.page++;
    this.setData({
      page: page
    })
    if(this.data.activeIndex == 0){
      this.getAgentProfitList();
    }else{
      this.getSellerProfitList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickNav(e){
    this.setData({
      list: [],
      page: 1,
      activeIndex: e.currentTarget.dataset.index
    })
    if(this.data.activeIndex == 0){
      this.getAgentProfitList();
    }else{
      this.getSellerProfitList();
    }
  },
  bindDateChange(e){
    this.setData({
      list: [],
      page: 1,
      date: e.detail.value
    })
    if(this.data.activeIndex == 0){
      this.getAgentProfitList();
    }else{
      this.getSellerProfitList();
    }
  },
  getAgentProfitList(){
    agent_coupon_profit_list({
      date: this.data.date,
      pageNum: this.data.page,
      pageSize: 20
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },
  getSellerProfitList(){
    seller_coupon_profit_list({
      date: this.data.date,
      pageNum: this.data.page,
      pageSize: 20
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id;
    var type = '';
    if(this.data.activeIndex == 0){
      type = 'boss';
    }else{
      type = 'boss_seller';
    }
    wx.navigateTo({
      url: '/pages/profitDetail/index?type=' + type + '&id=' + id + '&date=' + this.data.date
    })
  }
})
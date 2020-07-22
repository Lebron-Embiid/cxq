// pages/profitDetail/index.js
import {
  agent_coupon_profit_info,
  seller_coupon_profit_info,
  seller_coupon_discount_info
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list: ["收益详情","折让详情"],
    activeIndex: 0,
    today: '',
    id: '',
    bossId: '',
    type: '',
    date: '',
    page: 1,
    list: []
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

    if(options.index){
      this.setData({
        activeIndex: options.index
      })
    }
    if(options.bossId){
      this.setData({
        bossId: options.bossId
      })
    }

    this.setData({
      type: options.type,
      id: options.id,
      date: options.date,
      today: today
    })
    console.log(this.data.type)
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
  },
  // 代理人详情
  getAgentDetail(){
    let data = {
      date: this.data.date,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'agent'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20,
        bossId: this.data.bossId
      }
    }
    agent_coupon_profit_info(data).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },
  // 销售员收益详情
  getSellerProfitDetail(){
    let data = {
      date: this.data.date,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'seller'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20
      }
    }
    seller_coupon_profit_info(data).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },
  // 销售员折让详情
  getSellerDiscountDetail(){
    let data = {
      date: this.data.date,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'seller'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20
      }
    }
    seller_coupon_discount_info(data).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },  
  bindDateChange(e){
    this.setData({
      list: [],
      page: 1,
      today: e.detail.value
    })
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
  },
  clickNav(e){
    this.setData({
      list: [],
      page: 1,
      activeIndex: e.currentTarget.dataset.index
    })
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
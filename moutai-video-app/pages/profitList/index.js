// pages/profitList/index.js
import * as echarts from '../../components/ec-canvas/echarts';
import {
  agent_coupon_profit_list,
  seller_coupon_profit_list
} from '../../api/user.js'

var Chart = null;
var dataList = [];
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
    page: 1,
    ec: {
      lazyLoad: true // 延迟加载
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据

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
  getLastSevenDay(n){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var tdate = new Date(timestamp * 1000);
    //获取年份
    var Y = tdate.getFullYear();
    //获取月份
    var M = (tdate.getMonth() + 1 < 10 ? '0' + (tdate.getMonth() + 1) : tdate.getMonth() + 1);
    //获取当日日期
    var D = tdate.getDate() < 10 ? '0' + tdate.getDate() : tdate.getDate();
    //減7天的时间戳：
    var before_timetamp = timestamp - 24 * 60 * 60 * n;
    //減7天的时间：
    var n_to = before_timetamp * 1000;
    var before_timetamp = new Date(n_to);
    var Y_before = before_timetamp.getFullYear();
    //月份
    var M_before = (before_timetamp.getMonth() + 1 < 10 ? '0' + (before_timetamp.getMonth() + 1) : before_timetamp.getMonth() + 1);
    //日期
    var D_before = before_timetamp.getDate() < 10 ? '0' + before_timetamp.getDate() : before_timetamp.getDate();
    var lastDay = {
      M_before,
      D_before
    }
    // console.log(M_before,D_before)
    return lastDay;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getData(){
    dataList = [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    },{
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'D',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'E',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'F',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'G',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: 'H',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
    this.init_echarts();
    // if (!Chart){
    //   this.init_echarts(); //初始化图表
    // }else{
    //   this.setOption(Chart); //更新数据
    // }
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: 3
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption(){
    let last7 = [];
    for(let i=0;i<=6;i++){
      this.getLastSevenDay(i);
      // 获取最近7天的日期
      last7.unshift(this.getLastSevenDay(i).M_before+'月'+this.getLastSevenDay(i).D_before+'日');
    }
    console.log(last7)

    var option = {
      title: {
        text: '促销劵出售趋势图',
        left: 'center'
      },
      // color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      legend: {
        data: ['A', 'B', 'C','D', 'E', 'F','G', 'H', 'I'],
        bottom: 0,
        left: 'center',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: last7,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: dataList
    };
    return option;
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
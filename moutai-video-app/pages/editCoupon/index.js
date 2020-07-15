// pages/editCoupon/index.js
import {
  editCoupon,
  queryEditCouponInfo
} from '../../api/user.js'
import publicFun from '../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //促销券id
    coupon_name: '',
    price: '',
    face: '',
    count: '',
    date: '',
    profit: '',
    date_txt: '请选择促销券有效时间',
    is_edit: false,
    couponId: '',
    video_list: [{sort: 1,videoName: '视频1',weseeLink: ''},{sort: 2,videoName: '视频2',weseeLink: ''},{sort: 3,videoName: '视频3',weseeLink: ''}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id
      })
    }
    console.log(options.id)
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
    this.getEditFinish();
  },
  getEditFinish(save){
    queryEditCouponInfo({
      imageNum: this.data.id
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          is_edit: res.data!=null?true:false,
          couponId: res.data!=null?res.data.couponId:'',
          coupon_name: res.data!=null?res.data.couponName:'',
          count: res.data!=null?res.data.count:'',
          price: res.data!=null?res.data.price:'',
          profit: res.data!=null?res.data.profit:'',
          date: res.data!=null?res.data.trem:'',
          date_txt: res.data!=null?res.data.trem:'请选择促销券有效时间',
          face: res.data!=null?res.data.value:'',
          video_list: res.data!=null?res.data.codeVideoList:this.data.video_list
        })
        if(save){
          publicFun.getToast('编辑成功');
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },1500)
        }
        console.log(this.data.is_edit,this.data.couponId)
      }
    })
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

  },
  getCouponName(e){
    this.setData({
      coupon_name: e.detail.value
    })
  },
  getPrice(e){
    this.setData({
      price: e.detail.value
    })
  },
  getFace(e){
    this.setData({
      face: e.detail.value
    })
  },
  getCount(e){
    this.setData({
      count: e.detail.value
    })
  },
  getProfit(e){
    this.setData({
      profit: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      date_txt: e.detail.value
    })
  },
  getVideoName(e){
    let index = e.currentTarget.dataset.index;
    let videoCur = this.data.video_list;
    videoCur[index].videoName = e.detail.value;
    this.setData({
      video_list: videoCur
    })
  },
  getVideoUrl(e){
    let index = e.currentTarget.dataset.index;
    let videoCur = this.data.video_list;
    videoCur[index].weseeLink = e.detail.value;
    this.setData({
      video_list: videoCur
    })
  },
  save(){
    if(this.data.price == ''){
      publicFun.getToast('请输入促销券价格');
      return;
    }
    // if(this.data.face == ''){
    //   publicFun.getToast('请输入促销券面额');
    //   return;
    // }
    // if(this.data.date == ''){
    //   publicFun.getToast('请选择促销券有效时间');
    //   return;
    // }
    if(this.data.count == ''){
      publicFun.getToast('请输入促销券有效次数');
      return;
    }
    // if(this.data.profit == ''){
    //   publicFun.getToast('请输入代理人收益');
    //   return;
    // }
    if(this.data.video_list[0].weseeLink == '' && this.data.video_list[1].weseeLink == '' && this.data.video_list[2].weseeLink == ''){
      publicFun.getToast('请至少上传一个视频链接');
      return;
    }
    // if(this.data.video_list[0].videoName == '' && this.data.video_list[1].videoName == '' && this.data.video_list[2].videoName == ''){
    //   publicFun.getToast('请填写视频名称');
    //   return;
    // }
    let data = {
      couponName: this.data.coupon_name,
      imageNum: this.data.id,
      price: this.data.price,
      trem: this.data.date,
      count: this.data.count,
      profit: this.data.profit,
      value: this.data.face,
      jsonList: JSON.stringify(this.data.video_list),
      status: '0'
    }
    if(this.data.is_edit == true){
      data = {
        couponId: this.data.couponId,
        couponName: this.data.coupon_name,
        imageNum: this.data.id,
        price: this.data.price,
        trem: this.data.date,
        count: this.data.count,
        profit: this.data.profit,
        value: this.data.face,
        jsonList: JSON.stringify(this.data.video_list),
        status: '0'
      }
    }
    editCoupon(data).then((res)=>{
      if(res.code == 200){
        this.getEditFinish('save');
      }
    })
  },
  submitForm(e){
    if(this.data.video_list[0].weseeLink == '' && this.data.video_list[1].weseeLink == '' && this.data.video_list[2].weseeLink == ''){
      publicFun.getToast('请至少上传一个视频链接');
      return;
    }
    // if(this.data.video_list[0].videoName == '' && this.data.video_list[1].videoName == '' && this.data.video_list[2].videoName == ''){
    //   publicFun.getToast('请填写视频名称');
    //   return;
    // }
    let data = {
      couponName: this.data.coupon_name,
      imageNum: this.data.id,
      price: this.data.price,
      trem: this.data.date,
      count: this.data.count,
      profit: this.data.profit,
      value: this.data.face,
      jsonList: JSON.stringify(this.data.video_list),
      status: '1'
    }
    if(this.data.is_edit == true){
      data = {
        couponId: this.data.couponId,
        couponName: this.data.coupon_name,
        imageNum: this.data.id,
        price: this.data.price,
        trem: this.data.date,
        count: this.data.count,
        profit: this.data.profit,
        value: this.data.face,
        jsonList: JSON.stringify(this.data.video_list),
        status: '1'
      }
    }
    editCoupon(data).then((res)=>{
      if(res.code == 200){
        let video_list = [{sort: 1,videoName: '',weseeLink: ''},{sort: 2,videoName: '',weseeLink: ''},{sort: 3,videoName: '',weseeLink: ''}];
        this.setData({
          coupon_name: '',
          price: '',
          date: '',
          date_txt: '请选择促销券有效时间',
          count: '',
          profit: '',
          face: '',
          video_list: video_list
        })
        publicFun.getToast('发行成功');
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }
    })
  }
})
import {
  getInfo,
  appRole,
  getCode,
  getPrivateKey,
  queryCouponCollectList,
  queryMyCouponList,
  queryBusinessInfo
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    name: '',
    phone: '',
    identity: '',//boss agent seller 
    nav_list: ['收藏促销券','已购销售券','我想'],
    nav_active: 0,
    coupon_list: [],
    collect_list: [],
    promotion_list:[
      {icon: '/assets/nav_icon9.png',title: '我当销售员'},
      {icon: '/assets/nav_icon8.png',title: '我做代理人'},
      {icon: '/assets/nav_icon6.png',title: '我发促销券'},
      {icon: '/assets/nav_icon6.png',title: '我做编辑人'}
    ],
    code_img: [],
    key: '',
    page: 1,
    pages: 1,
    is_pass: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(wx.getStorageSync('token'));
    // this.userInfo();

    
    //获取二维码
    // getCode().then(res=>{
    //   const base64ImgUrl = "data:image/png;base64," + res.data;
    //   base64src(base64ImgUrl,1,ress=>{
    //     this.data.code_img[0] = ress;
    //     this.setData({
    //       code_img: this.data.code_img
    //     })
    //   })
    // })
  },
  onShow() {
    this.getCollectList();

    // queryBusinessInfo().then((res)=>{
    //   if(res.code == 200){
    //     if(res.data.status == '待审批'){
    //       this.setData({
    //         is_pass: 1
    //       })
    //     }
    //   }
    // })

    //获取用户信息
    getInfo().then(res=>{
      if(res.code == 401){
        wx.reLaunch({
          url: '/pages/login/index',
        })
      }
      if(res.code == 200){
        if(res.data.type != null){
          this.data.nav_list = ['收藏促销券','已购销售券'];
        }
        this.setData({
          nav_list: this.data.nav_list,
          avatar: res.data.headPortraitLink,
          name: res.data.nickname,
          phone: res.data.phone,
          identity: res.data.type
        })
      }
    })
  },
  getCollectList() {
    //收藏列表
    queryCouponCollectList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(res=>{
      this.setData({
        collect_list: this.data.collect_list.concat(res.data.records),
        pages: res.data.pages
      })
    })
  },
  getBuyList(){
    queryMyCouponList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(res=>{
      this.setData({
        coupon_list: this.data.coupon_list.concat(res.data.records),
        pages: res.data.pages
      })
    })
  },
  userInfo() {
    wx.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        this.setData({
          avatar: userInfo.avatarUrl,
          name: userInfo.nickName
        })
      }
    })
  },
  clickNav(e){
    this.setData({
      nav_active: e.currentTarget.dataset.index,
      collect_list: [],
      coupon_list: [],
      page: 1
    })
    if(this.data.nav_active == 0){
      this.getCollectList();
    }else if(this.data.nav_active == 1){
      this.getBuyList();
    }
  },
  getCouponMore(){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      this.getBuyList();
    }
  },
  getCollectMore(){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      this.getCollectList();
    }
  },
  selectCoupon(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?src='+this.data.coupon_list[index].coupon,
    })
  },
  clickItem(e){
    let index = e.currentTarget.dataset.index;
    let that = this;
    if(index == 0){
      // 申请成为销售员
      appRole({
        type: 'seller'
      }).then(res=>{
        if(res.code == 200){
          wx.showToast({
            title: '请求成功',
            icon: 'none'
          })
        }
      })
      // appRole({
      //   type: 'seller'
      // }).then(res=>{
      //   const base64Img = "data:image/png;base64," + res.data;
      //   base64src(base64Img,1,ress=>{
      //     that.setData({
      //       code_img: ress
      //     })
      //   })
      // })
    }else if(index == 1){
      appRole({
        type: 'agent'
      }).then(res=>{
        if(res.code == 200){
          wx.showToast({
            title: '请求成功',
            icon: 'none'
          })
        }
      })
    }else if(index == 2){
      wx.navigateTo({
        url: '/pages/merchant/index?pass='+this.data.is_pass
      })
    }else{
      // 我做编辑人
      
    }
  },
  previewCode(){
    let that = this;
    wx.previewImage({
      current: 0, // 当前显示图片的http链接
      urls: that.data.code_img // 需要预览的图片http链接列表
    })
  }
})
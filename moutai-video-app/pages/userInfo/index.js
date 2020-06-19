import {
  getInfo,
  appRole,
  getCode,
  getPrivateKey,
  couponCollect,
  queryCouponCollectList,
  queryMyCouponList,
  queryBusinessInfo,
  queryCouponBrowse,
  querySellCouponList
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
    nav_list: ['浏览促销券','收藏促销券','已购销售券'],//,'我想'
    nav_active: 0,
    look_list: [],
    coupon_list: [],
    collect_list: [],
    promotion_list:[
      {icon: '/assets/nav_icon9.png',title: '我当销售员'},
      {icon: '/assets/nav_icon8.png',title: '我做代理人'},
      {icon: '/assets/nav_icon6.png',title: '我发促销券'}
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

    // this.getLookList();
  },
  onShow() {
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
        if(res.data.type == null){
          this.data.nav_list = ['浏览促销券','收藏促销券','已购销售券'];
        }
        if(res.data.type == 'seller'){
          this.data.nav_list = ['已出售销售券'];
        }
        if(res.data.type == 'agent'){
          this.data.nav_list = ['浏览促销券','收藏促销券'];
        }
        if(res.data.type == 'boss'){
          this.data.nav_list = ['浏览促销券'];
        }
        this.setData({
          nav_list: this.data.nav_list,
          avatar: res.data.headPortraitLink,
          name: res.data.nickname,
          phone: res.data.phone,
          identity: res.data.type
        })

        if(this.data.identity != 'seller'){
          this.getLookList();
        }
        if(this.data.identity == 'seller'){
          this.getBuyList();
        }
      }
    }).catch(err=>{
      wx.reLaunch({
        url: '/pages/login/index',
      })
    })
  },
  scanCode() {
    wx.scanCode({
      success(res) {
        console.log('扫码返回的参数'+res.result);
        let data = wx.getQueryString({
          url: res.result,
          name: "data"
        });
        wx.setStorage({
          data: data,
          key: 'params',
        })
        wx.navigateTo({
          url: '/pages/demo/index?data=' + data
        })
      }
    })
  },
  toPromotion(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/promotion/index'
    })
  },
  getLookList() {
    //浏览列表
    queryCouponBrowse({
      pageNum: this.data.page,
      pageSize: 5
    }).then(lookres=>{
      if(lookres.code == 200){
        for(let i in lookres.data.records){
          let item = lookres.data.records[i];
          let base64 = "data:image/png;base64," + item.rqcode;
          base64src(base64,item.certId,ress=>{
            this.data.look_list.push({
              id: item.certId,
              couponId: item.couponId,
              coupon: ress
            });
            this.setData({
              look_list: this.data.look_list,
              pages: lookres.data.pages
            })
          })
        }
      }
    })
  },
  getCollectList() {
    //收藏列表
    queryCouponCollectList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(res=>{
      if(res.code == 200){
        for(let i in res.data.records){
          let item = res.data.records[i];
          let base64 = "data:image/png;base64," + item.rqcode;
          base64src(base64,item.couponId,ress=>{
            this.data.collect_list.push({
              id: item.couponId,
              coupon: ress
            });
            this.setData({
              collect_list: this.data.collect_list,
              pages: res.data.pages
            })
          })
        }
      }
    })
  },
  getBuyList(){
    if(this.data.identity == null){
      queryMyCouponList({
        pageNum: this.data.page,
        pageSize: 5
      }).then(buyres=>{
        if(buyres.code == 200){
          for(let i in buyres.data.records){
            let item = buyres.data.records[i];
            let base64 = "data:image/png;base64," + item.rqcode;
            base64src(base64,item.couponId,ress=>{
              this.data.coupon_list.push({
                id: item.couponId,
                coupon: ress
              });
              this.setData({
                coupon_list: this.data.coupon_list,
                pages: buyres.data.pages
              })
            })
          }
          // let coupon_list = this.data.coupon_list;
          // if(this.data.page == 1){
          //   coupon_list = res.data.records;
          // }else{
          //   coupon_list = coupon_list.concat(res.data.records);
          // }
          // this.setData({
          //   coupon_list: coupon_list,
          //   pages: res.data.pages
          // })
        }
      })
    }
    if(this.data.identity == 'seller'){
      querySellCouponList({
        pageNum: this.data.page,
        pageSize: 5
      }).then((res)=>{
        if(res.code == 200){
          for(let i in res.data.records){
            let item = res.data.records[i];
            let base64 = "data:image/png;base64," + item.rqcode;
            base64src(base64,item.couponId,ress=>{
              this.data.coupon_list.push({
                id: item.couponId,
                coupon: ress
              });
              this.setData({
                coupon_list: this.data.coupon_list,
                pages: res.data.pages
              })
            })
          }
        }
      })
    }
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
      page: 1
    })
    
    if(res.data.type == null){
      if(this.data.nav_active == 0){
        this.getLookList();
      }else if(this.data.nav_active == 1){
        this.getCollectList();
      }else{
        this.getBuyList();
      }
    }
    if(res.data.type == 'seller'){
      if(this.data.nav_active == 0){
        this.getBuyList();//已出售促销券
      }
    }
    if(res.data.type == 'agent'){
      if(this.data.nav_active == 0){
        this.getLookList();
      }else{
        this.getCollectList();
      }
    }
    if(res.data.type == 'boss'){
      if(this.data.nav_active == 0){
        this.getLookList();
      }
    }
  },
  getLookMore(){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      this.getLookList();
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
  selectLook(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?type=buy&src='+this.data.look_list[index].coupon,
    })
  },
  toCollect(e){
    let item = e.currentTarget.dataset.item;
    couponCollect({
      certId: item.certId,
      couponId: item.couponId
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功！',
          icon: 'none'
        })
      }
    })
  },
  selectCollect(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?src='+this.data.collect_list[index].coupon,
    })
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
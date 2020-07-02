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
  querySellCouponList,
  queryCouponUseList,
  querySellCouponListBySeller,
  queryUseCouponListBySeller
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '/assets/avatar.svg',
    name: '',
    phone: '',
    identity: '',//boss agent seller 
    nav_list: ['浏览促销券','收藏促销券','已购销售券'],//,'我想'
    nav_active: 0,
    look_list: [],
    coupon_list: [],
    collect_list: [],
    sellerList1: [],
    sellerList2: [],
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
        
      }
      if(res.code == 200){
        let nav_list = [];
        if(res.data.type == null){
          nav_list = ['浏览促销券','收藏促销券','已购促销券'];
        }
        if(res.data.type == 'seller'){
          nav_list = ['已出售促销券','已验收促销券'];
        }
        if(res.data.type == 'agent'){
          nav_list = ['浏览促销券','收藏促销券'];
        }
        if(res.data.type == 'boss'){
          nav_list = ['浏览促销券'];
        }
        this.setData({
          nav_list: nav_list,
          avatar: res.data.headPortraitLink,
          name: res.data.nickname,
          phone: res.data.phone,
          identity: res.data.type,
          look_list: []
        })

        if(this.data.identity != 'seller'){
          this.getLookList();
        }
        if(this.data.identity == 'seller'){
          this.getBuyList();
        }
      }
    }).catch(err=>{
      
    })
  },
  getUserLogin(){
    this.onShow();
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
          base64src(base64,item.couponId,ress=>{
            this.data.look_list.push({
              certId: item.certId,
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
              certId: item.certId,
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
          console.log('已购促销券返回的json数据：'+JSON.stringify(buyres.data))
          for(let i in buyres.data.records){
            let item = buyres.data.records[i];
            let base64 = "data:image/png;base64," + item.rqcode;
            base64src(base64,item.certId,ress=>{
              this.data.coupon_list.push({
                certId: item.certId,
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
      querySellCouponListBySeller({
        pageNum: this.data.page,
        pageSize: 10
      }).then((res)=>{
        console.log('已出售促销券返回的json数据：'+JSON.stringify(res.data))
        if(res.code == 200){
          this.setData({
            sellerList1: res.data.records,
            pages: res.data.pages
          })
        }
      })
    }
  },
  getConsumeList(){
    queryUseCouponListBySeller({
      pageNum: this.data.page,
      pageSize: 10
    }).then((res)=>{
      console.log('已验收促销券返回的json数据：'+JSON.stringify(res.data))
      if(res.code == 200){
        this.setData({
          sellerList2: res.data.records,
          pages: res.data.pages
        })
      }
    })
  },
  getSellerListMore1(){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      querySellCouponListBySeller({
        pageNum: this.data.page,
        pageSize: 10
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            sellerList1: this.data.sellerList1.concat(res.data.records),
            pages: res.data.pages
          })
        }
      })
    }
  },
  getSellerListMore2(){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      queryUseCouponListBySeller({
        pageNum: this.data.page,
        pageSize: 10
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            sellerList2: this.data.sellerList2.concat(res.data.records),
            pages: res.data.pages
          })
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
    let index = e.currentTarget.dataset.index;
    this.setData({
      nav_active: index,
      page: 1,
      look_list: [],
      coupon_list: [],
      collect_list: []
    })
    if(this.data.identity == null){
      if(index == 0){
        this.getLookList();
      }else if(index == 1){
        this.getCollectList();
      }else{
        this.getBuyList();
      }
    }
    if(this.data.identity == 'seller'){
      if(index == 0){
        this.getBuyList();//已出售促销券
      }else{
        this.getConsumeList();//已验收促销券
      }
    }
    if(this.data.identity == 'agent'){
      if(index == 0){
        this.getLookList();
      }else{
        this.getCollectList();
      }
    }
    if(this.data.identity == 'boss'){
      if(index == 0){
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
      url: '/pages/couponDetail/index?type=buy&src='+this.data.look_list[index].coupon+'&certId='+this.data.look_list[index].certId
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
      url: '/pages/couponDetail/index?type=buy&src='+this.data.collect_list[index].coupon+'&certId='+this.data.collect_list[index].certId
    })
  },
  selectCoupon(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?buy=ok&src='+this.data.coupon_list[index].coupon+'&certId='+this.data.coupon_list[index].certId
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
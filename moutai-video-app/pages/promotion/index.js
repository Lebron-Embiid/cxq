// pages/promotion/index.js
import {
  getInfo,
  appRole,
  shoWEditCouponList,
  getAgentCouponList,
  queryAllCouponAgentList,
  addCouponAgentList,
  editCoupon,
  addCouponAgent,
  queryCouponSellList,
  queryAllCouponSellList,
  queryCouponUseList,
  queryCouponUseList2,
  querySellCouponList,
  couponConsume,
  couponSell,
  queryBusinessInfo
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '/assets/avatar.svg',
    name: '',
    phone: '',
    coupon_id: '',
    is_home: true,
    identity: null,//boss agent seller 
    id_title: '',
    promotion_list: [],
    coupon_list: [],
    issued_list: [],
    is_list: 0, //0: 编辑列表   1：发行列表
    index: '',
    page: 1,
    pages: 1,
    status: 1,
    is_pass: 0,
    is_issue: 0,
    back_img: '../../assets/back.jpg',
    dataStr: '',
    consumerId: '',
    is_click: false,  //是否点击我的商家按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.userInfo();
    var that = this;
    //查看促销券出售数量(老板)
    // queryAllCouponSellList({
    //   pageNum: 1,
    //   pageSize: 5
    // }).then(res=>{})

    let promotion_list = [
      {icon: '/assets/nav_icon9.png',title: '我当销售员'},
      {icon: '/assets/nav_icon8.png',title: '我做代理人'},
      {icon: '/assets/nav_icon6.png',title: '我发促销券'}
    ]
    that.setData({
      promotion_list: promotion_list,
      is_click: false
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
    // this.setData({
    //   is_home: true,
    //   is_issue: 0
    // })
    var that = this;
    queryBusinessInfo().then((res)=>{
      if(res.code == 200){
        console.log(JSON.stringify(res.data.status))
        if(res.data.status == '待审批'){
          that.setData({
            is_pass: 1
          })
        }else{
          this.setData({
            is_pass: 0
          })
        }
      }
    })

    wx.checkSession({
      success () {
        console.log('登录未过期');
        wx.setStorage({
          data: 1,
          key: 'check',
        })
        //session_key 未过期，并且在本生命周期一直有效
    
        getInfo().then(res=>{
          if(res.code == 200){
            // var promotion_list = [];
            // var id_title = '';
            // if(res.data.type == null){
            //   id_title = '消费者';
            // }
            // promotion_list = [
            //   {icon: '/assets/nav_icon9.png',title: '我当销售员'},
            //   {icon: '/assets/nav_icon8.png',title: '我做代理人'},
            //   {icon: '/assets/nav_icon6.png',title: '我发促销券'}
            // ]
            that.setData({
              // promotion_list: promotion_list,
              // id_title: id_title,
              avatar: res.data.headPortraitLink,
              name: res.data.nickname,
              // phone: res.data.phone,
              identity: res.data.type
            })
            // let identity = this.data.identity;
            // let identity = res.data.type;
            // if(identity == 'boss'){
            //   // 老板
            //   id_title = '老板';
            //   promotion_list = [
            //     {icon: '/assets/nav_icon2.png',title: '促销券编辑'},
            //     {icon: '/assets/nav_icon9.png',title: '我的销售员'},
            //     {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
            //     {icon: '/assets/nav_icon6.png',title: '促销券发行'},
            //     {icon: '/assets/nav_icon8.png',title: '我的代理人'},
            //     {icon: '/assets/nav_icon7.png',title: '促销券收益'}
            //   ]
            // }else if(identity == 'agent'){
            //   // 代理人
            //   id_title = '代理人';
            //   promotion_list = [
            //     {icon: '/assets/nav_icon1.png',title: '促销券收藏'},
            //     {icon: '/assets/nav_icon6.png',title: '促销券再发行'},
            //     {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
            //     {icon: '/assets/nav_icon7.png',title: '促销券收益'}
            //   ]
            // }else if(identity == 'seller'){
            //   // 销售员
            //   id_title = '销售员';
            //   promotion_list = [
            //     {icon: '/assets/nav_icon4.png',title: '促销券销售'},
            //     {icon: '/assets/nav_icon5.png',title: '促销券验证'},
            //     {icon: '/assets/nav_icon3.png',title: '促销券收入'},
            //     {icon: '/assets/nav_icon7.png',title: '促销券折让'}
            //   ]
            // }else{
            //   id_title = '消费者';
            //   promotion_list = [
            //     {icon: '/assets/nav_icon9.png',title: '我当销售员'},
            //     {icon: '/assets/nav_icon8.png',title: '我做代理人'},
            //     {icon: '/assets/nav_icon6.png',title: '我发促销券'}
            //     // {icon: '/assets/nav_icon6.png',title: '我做编辑人'}
            //   ]
            // }
          }
        }).catch(err=>{
          let promotion = [{icon: '/assets/nav_icon9.png',title: '我当销售员'},
              {icon: '/assets/nav_icon8.png',title: '我做代理人'},
              {icon: '/assets/nav_icon6.png',title: '我发促销券'}
            ];
            that.setData({
              promotion_list:  promotion,
              is_click: false
            })
        })
        // .finally(sfs=>{
        //   wx.reLaunch({
        //     url: "/pages/login/index"
        //   })
        // })
      },
      fail () {
        console.log('登录已过期');
        wx.setStorage({
          data: 2,
          key: 'check',
        })
        // session_key 已经失效，需要重新执行登录流程
      }
    })
  },
  getUserLogin(){
    this.onShow();
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
    wx.getSavedFileList({
      success: (res) => {
        res.fileList.forEach((val,key) => {
          wx.removeSavedFile({
            filePath: val.filePath
          })
        })
      }
    })
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
  getCouponList(){
    // 查看可编辑的促销券列表(老板)
    shoWEditCouponList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(ress=>{
      let coupon_list = [];
      for(let i in ress.data){
        let random = Math.floor(Math.random()*99999999);
        let base64 = "data:image/png;base64," + ress.data[i];
        base64src(base64,i,image=>{
          this.data.coupon_list.push({
            id: i,
            src: image
          })
          this.setData({
            coupon_list: this.data.coupon_list,
            pages: ress.data.pages
          })
        })
      }
    })
  },
  getCouponList1(){
    // 查看可发行的促销券列表(代理人)
    getAgentCouponList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(res=>{
      for(let i in res.data.records){
        let item = res.data.records[i];
        let random = Math.floor(Math.random()*99999999);
        let base64 = "data:image/png;base64," + item.rqcode;
        let coupon_list = [];
        base64src(base64,item.couponId,ress=>{
          this.data.coupon_list.push({
            id: item.couponId,
            src: ress
          });
          this.setData({
            coupon_list: this.data.coupon_list,
            pages: res.data.pages
          })
        })
      }
    })
  },
  getIssuedList(status){
    // 查看已发行的促销券列表(老板)
    let data ={
      status: status,
      pageNum: this.data.page,
      pageSize: 5
    }
    addCouponAgentList(data).then(res=>{
      for(let i in res.data.records){
        let random = Math.floor(Math.random()*99999999);
        let item = res.data.records[i];
        let base64 = "data:image/png;base64," + item.rqcode;
        let issued_list = [];
        base64src(base64,item.couponId,ress=>{
          this.data.issued_list.push({
            id: item.couponId,
            src: ress
          });
          this.setData({
            issued_list: this.data.issued_list,
            pages: res.data.pages
          })
        })
      }
    })
  },
  getIssuedList1(status){
    // 查看已发行的促销券列表(代理人)
    let data = {
      status: status,//1:当前  0:回顾
      pageNum: this.data.page,
      pageSize: 5
    }
    addCouponAgentList(data).then(res=>{
      for(let i in res.data.records){
        let random = Math.floor(Math.random()*99999999);
        let item = res.data.records[i];
        let base64 = "data:image/png;base64," + item.rqcode;
        let issued_list = [];
        base64src(base64,item.couponId,ress=>{
          this.data.issued_list.push({
            id: item.couponId,
            src: ress
          });
          this.setData({
            issued_list: this.data.issued_list,
            pages: res.data.pages
          })
        })
      }
    })
  },
  // 编辑列表分页
  getCouponMore(e){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      if(this.data.identity == 'boss'){
        this.getCouponList();
      }
      if(this.data.identity == 'agent'){
        this.getCouponList1();
      }
    }
  },
  // 发行列表分页
  getIssuedMore(e){
    if(this.data.page<this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      if(this.data.identity == 'boss'){
        this.getIssuedList(this.data.status);
      }
      if(this.data.identity == 'agent'){
        this.getIssuedList1(this.data.status);
      }
    }
  },
  // 点击导航触发事件
  getListClick(e){
    console.log(e.detail)
    console.log(this.data.identity);
    this.setData({
      index: e.detail.index
    })
    if(this.data.is_click == true){
      if(this.data.identity ==  'boss'){
        if(e.detail.index == 0){
          this.setData({
            page: 1,
            is_list: 0,
            is_home: false,
            coupon_list: []
          })
          console.log(this.data.is_list)
          this.getCouponList();
        }
        if(e.detail.index == 1){
          wx.navigateTo({
            url: '/pages/mySeller/index',
          })
        }
        if(e.detail.index == 2){
          // 促销券回顾
          this.setData({
            page: 1,
            is_list: 1,
            is_home: false,
            status: 0,
            issued_list: []
          })
          console.log(this.data.is_list)
          this.getIssuedList(0);
        }
        if(e.detail.index == 3){
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: []
          })
          this.getIssuedList(1);
        }
        if(e.detail.index == 4){
          wx.navigateTo({
            url: '/pages/myAgent/index',
          })
        }
        if(e.detail.index == 5){
          //促销券收益（查看促销券出售数量）--老板
          queryAllCouponSellList({
            pageNum: this.data.page,
            pageSize: 5
          }).then(res=>{

          })
        }
      }else if(this.data.identity == 'agent'){
        if(e.detail.index == 0){
          this.setData({
            page: 1,
            is_list: 0,
            is_home: false,
            coupon_list: []
          })
          this.getCouponList1();
        }
        if(e.detail.index == 1){
          this.setData({
            page: 1,
            is_list: 1,
            is_home: false,
            status: 1,
            issued_list: []
          })
          this.getIssuedList1(1);
        }
        if(e.detail.index == 2){
          // 促销券回顾
          this.setData({
            page: 1,
            is_list: 1,
            is_home: false,
            status: 0,
            issued_list: []
          })
          this.getIssuedList1(0);
        }
        if(e.detail.index == 3){
          //查看促销券出售数量(代理人)
          queryCouponSellList({
            pageNum: this.data.page,
            pageSize: 5
          }).then((res)=>{
            
          })
        }
      }else if(this.data.identity == 'seller'){
        // 销售员
        if(e.detail.index == 0){
          // 销售
          var that = this;
          wx.scanCode({
            onlyFromCamera: true,
            success(res) {
              // console.log('扫码返回的参数: '+res.result.length);
              console.log(res.result.length)
              if(res.result.length == 28){
                that.setData({
                  consumerId: res.result
                })
              }else{
                let data = wx.getQueryString({
                  url: res.result,
                  name: "data"
                });
                that.setData({
                  dataStr: data
                })
              }
              if(that.data.dataStr != '' && that.data.consumerId != ''){
                console.log('请求的参数：'+that.data.consumerId,that.data.dataStr);
                couponSell({
                  consumerId: that.data.consumerId,//消费者ID
                  data: that.data.dataStr//要购买的促销劵二维码
                }).then(resg=>{
                  if(resg.code == 200){
                    // console.log(JSON.stringify(resg));
                    publicFun.getToast(resg.data,'success')
                  }
                })
              }
              // console.log('扫码返回的参数2'+data);
            }
          })
        }
        if(e.detail.index == 1){
          // 验证
          wx.scanCode({
            onlyFromCamera: true,
            success (res) {
              // console.log('扫码返回的参数1'+JSON.stringify(res.result));
              let data = wx.getQueryString({
                url: res.result,
                name: "data"
              });
              // console.log('扫码返回的参数2'+JSON.stringify(data));
              couponConsume({
                param: data
              }).then((resg)=>{
                if(resg.code == 200){
                  publicFun.getToast(resg.data,'success')
                }
              })
            }
          })
        }
        if(e.detail.index == 2){
          // 收入列表
          querySellCouponList({
            pageNum: this.data.page,
            pageSize: 5
          }).then((res)=>{
            
          })
        }
        if(e.detail.index == 3){
          // 折让列表
          queryCouponUseList2({
            pageNum: this.data.page,
            pageSize: 5
          }).then((res)=>{
            
          })
        }
      }
    }else{
      // 消费者
      if(e.detail.index == 0){
        if(wx.getStorageSync('check') == 1){
          // 申请成为销售员
          appRole({
            type: 'seller'
          }).then((res)=>{
            if(res.code == 200){
              wx.showToast({
                title: '请求成功',
                icon: 'none'
              })
            }
          })
        }else{
          // session_key 已经失效，需要重新执行登录流程
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
      }
      if(e.detail.index == 1){
        if(wx.getStorageSync('check') == 1){
          // 申请成为代理人
          appRole({
            type: 'agent'
          }).then((res)=>{
            if(res.code == 200){
              wx.showToast({
                title: '请求成功',
                icon: 'none'
              })
            }
          })
        }else{
          // session_key 已经失效，需要重新执行登录流程
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
      }
      if(e.detail.index == 2){
        let that = this;
        if(wx.getStorageSync('check') == 1){
          // 我发促销券
          wx.navigateTo({
            url: '/pages/merchant/index?pass='+that.data.is_pass
          })
        }else{
          // session_key 已经失效，需要重新执行登录流程
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
      }
      if(e.detail.index == 3){
        // 我做编辑人
      }
    }
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
  // 下载图片  
  downFile(url){  
    const _this = this;  
    wx.downloadFile({
      url: url,
      success: (ress) => {
        if (ress.statusCode === 200) {
          console.log(ress.tempFilePath);
          wx.saveImageToPhotosAlbum({
            filePath: ress.tempFilePath,
            success: (downImg)=> { 
              console.log(downImg);
            },
          })
        }
      }
    })
  },
  selectCoupon(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    if(this.data.identity ==  'boss'){
      if(this.data.index == 0){
        // 促销券编辑
        wx.navigateTo({
          url: '/pages/editCoupon/index?id='+this.data.coupon_list[index].id,
        })
        // let random = Math.floor(Math.random()*99999999);
        // let base64 = "data:image/png;base64," + ress.data;
        // base64src(base64,random,resss=>{
        //   this.downFile(resss);
        // })

        // setTimeout(()=>{
        //   this.setData({
        //     is_home: true
        //   })
        // },1500)
      }
      if(this.data.index == 3){
        wx.navigateTo({
          url: '/pages/couponDetail/index?src='+this.data.issued_list[index].src,
        })
      }
    }else if(this.data.identity == 'agent'){
      if(this.data.index == 0){
        // 促销券编辑
        editCoupon({
          image: this.data.coupon_list[index].id
        }).then(res=>{
          addCouponAgent({
            couponId: res.data.couponId
          }).then(ress=>{
            wx.showToast({
              title: ress.msg,
              duration: 1500
            })
            // setTimeout(()=>{
            //   this.setData({
            //     is_home: true
            //   })
            // },1500)
          })
        })
      }
      if(this.data.index == 1){
        wx.navigateTo({
          url: '/pages/couponDetail/index?src='+this.data.issued_list[index].src,
        })
      }
    }
  },
  toUser(){
    if(this.data.is_home == true){
      if(wx.getStorageSync('check') == 1){
        wx.navigateTo({
          url: '/pages/userInfo/index',
        })
      }else{
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
      }
    }else{
      this.setData({
        is_home: true,
        is_issue: 0
      })
    }
  },
  toIssue(){
    wx.navigateTo({
      url: '/pages/editIssue/index'
    })
  },
  toMyHouse(){
    var promotion_list = [];
    var id_title = '';
    var identity = this.data.identity;
    var is_click = !this.data.is_click;
    if(is_click){
      if(identity == 'boss'){
        // 老板
        id_title = '老板';
        promotion_list = [
          {icon: '/assets/nav_icon2.png',title: '促销券编辑'},
          {icon: '/assets/nav_icon9.png',title: '我的销售员'},
          {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
          {icon: '/assets/nav_icon6.png',title: '促销券发行'},
          {icon: '/assets/nav_icon8.png',title: '我的代理人'},
          {icon: '/assets/nav_icon7.png',title: '促销券收益'}
        ]
      }else if(identity == 'agent'){
        // 代理人
        id_title = '代理人';
        promotion_list = [
          {icon: '/assets/nav_icon1.png',title: '促销券收藏'},
          {icon: '/assets/nav_icon6.png',title: '促销券再发行'},
          {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
          {icon: '/assets/nav_icon7.png',title: '促销券收益'}
        ]
      }else if(identity == 'seller'){
        // 销售员
        id_title = '销售员';
        promotion_list = [
          {icon: '/assets/nav_icon4.png',title: '促销券销售'},
          {icon: '/assets/nav_icon5.png',title: '促销券验证'},
          {icon: '/assets/nav_icon3.png',title: '促销券收入'},
          {icon: '/assets/nav_icon7.png',title: '促销券折让'}
        ]
      }
    }else{
      promotion_list = [
        {icon: '/assets/nav_icon9.png',title: '我当销售员'},
        {icon: '/assets/nav_icon8.png',title: '我做代理人'},
        {icon: '/assets/nav_icon6.png',title: '我发促销券'}
      ]
    }
    this.setData({
      promotion_list: promotion_list,
      id_title: id_title,
      is_click: is_click
    })
  }
})
import {
  login,
  getUser,
  getSessinKey,
  getInfo
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openID:'',
    longitude:'',
    latitude:'',
    secretKey:'',
    is_auth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('is_auth')){
      this.setData({
        is_auth: wx.getStorageSync('is_auth')
      })
    }
  },
  getUserInfoFun(e){
    console.log(e)
    wx.login({
      success: (resg) => {
        if (resg.code) {
          console.log(resg);
          getSessinKey(resg.code).then(skres => {
            if (skres.code == 200) {
              console.log(skres);
              wx.getUserInfo({
                success: (res) => {
                  console.log(res)
                  var userInfo = wx.getStorageSync('loginInfo')
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  //登录调用
                  getUser({
                    encryptedData: e.detail.encryptedData,
                    headPortraitLink: avatarUrl,
                    iv: e.detail.iv,
                    nickname: nickName,
                    sessionKey: skres.data.sessionKey,
                    unionId: skres.data.openId
                  }).then(logRes => {
                    if(logRes.code == 200){
                      wx.setStorageSync('token', logRes.data.token);
                      getInfo().then(login_res=>{
                        if(login_res.code == 200){
                          wx.setStorageSync('userInfo', login_res.data);
                          wx.setStorageSync('login_update',1)
                          wx.navigateBack();
                        }
                      })
                    }
                  }).catch(err => {
                    wx.showToast({
                      title: err
                    })
                    console.log(err)
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  userInfo() {
    wx.getUserInfo({
      success: (res) => {
        wx.setStorageSync('is_auth', true)
        wx.setStorageSync('loginInfo', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          is_auth: true
        })
      }
    })
  },
  getPhoneNumber(e) {
    //判断用户同意或者拒绝
    var that=this
    if (e.detail.encryptedData) {
     
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          getSessinKey(res.code).then(skres => {
            console.log(skres)
            if (skres.code == 200) {
              console.log(skres.data.openId)
              that.openId=skres.data.openId
              console.log(that.openId)
              // 获取定位信息
              //  wx.getLocation({
              //         type: 'wgs84',
              //         success(res) {
              //     that.latitude = res.latitude
              //     that.longitude = res.longitude
              //          console.log(that.longitude,that.latitude)
              //         }
              //       })
                // 获取当前时间戳
                //  var timestamp = Date.parse(new Date());
              
                // wx.request({
                //   url: 'http://192.168.31.207:8080/getPriKey',
                //   method: 'GET',
                //   header: {
                //     'Authentication': wx.getStorageSync('token') || ''
                //   },
                //   dataType : 'json',
                //   timeout :10000,
                //   success: function (res) {
                //     console.log('1111',res)
                //     that.secretKey=res.data.data
                //   }
                // });
                // const sm2 = require('miniprogram-sm-crypto').sm2;
                // let keypair = sm2.generateKeyPairHex();

                //  let publicKey = keypair.publicKey; // 公钥
                //  let privateKey = keypair.privateKey; // 私钥
                // var msg= 'https://maotaiapi.lcpower.cn'+'T='+timestamp + 'lon='+that.longitude+'lat='+that.latitude+'UID='+that.openId
                // let sigValueHex = sm2.doSignature(msg, privateKey);
                // console.log('11111',
                // 'publicKey',publicKey,
                // 'privateKey',privateKey,
                // 'sigValueHex', sigValueHex)
                // wx.request({
                //   url: 'http://192.168.31.207:8080/checkP',
                //   method: 'GET',
                //   header: {
                //     'Authentication': wx.getStorageSync('token') || ''
                //   },
                //   data:{
                //     data:'123456',
                //     data1:'123456',
                //     prk:privateKey,
                //     puK: publicKey,
                //     sign:sigValueHex
                //   },
                //   dataType : 'json',
                //   timeout :10000,
                //   success: function (res) {
                //     console.log('1111',res)
                 
                //   }
                // });
              //拿到用户信息
              wx.getUserInfo({
                success: infoRes => {
                  var userInfo = infoRes.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  //登录调用
                  login({
                    encryptedData: e.detail.encryptedData,
                    headPortraitLink: avatarUrl,
                    iv: e.detail.iv,
                    nickname: nickName,
                    sessionKey: skres.data.sessionKey,
                    unionId: that.openId
                  }).then(logRes => {
                    if(res.code == 200){
                      wx.setStorageSync('token', logRes.data.token);
                      wx.redirectTo({
                        url: '/pages/index/index'
                      })
                    }
                  }).catch(err => {
                    wx.hideLoading()
                  })
                }
              })
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你未同意授权登录，请重新登录',
        showCancel: false,
        success(res) {

        }
      })
    }








  },
  toProtocol() {
    wx.navigateTo({
      url: '/pages/protocol/index'
    })
  }
})
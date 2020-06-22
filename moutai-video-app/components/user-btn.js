// components/user-btn.js
import {
  login,
  getUser,
  getSessinKey
} from '../api/user.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    getWxLogin(){
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
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    //登录调用
                    getUser({
                      // encryptedData: e.detail.encryptedData,
                      headPortraitLink: avatarUrl,
                      // iv: e.detail.iv,
                      nickname: nickName,
                      // sessionKey: skres.data.sessionKey,
                      unionId: skres.data.openId
                    }).then(logRes => {
                      console.log(logRes.data)
                      wx.setStorage({
                        key: "token",
                        data: logRes.data.token
                      })
                      wx.setStorage({
                        key: "userInfo",
                        data: logRes.data
                      })
                      this.triggerEvent('mylogin')
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
    userInfoFun(e){
      let that = this;
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          that.getWxLogin();
        }
      })
    }
  }
})

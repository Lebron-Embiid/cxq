// components/promotionList.js
import {
  getSessinKey,
  update_phone
} from '../api/user.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
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
    getUserPhone(e){
      wx.login({
        success: (resg) => {
          getSessinKey(resg.code).then(skres => {
            update_phone({
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              sessionKey: skres.data.sessionKey
            }).then((upres)=>{
              
            })
          })
        }
      })
    },
    clickItem(e){
      var myEventDetail = {
        title: e.currentTarget.dataset.item.title,
        index: e.currentTarget.dataset.index
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})

// pages/merchant/index.js
import {
  uploadFile,
  addMerchantInfo
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    license: '',
    is_license: 0,
    back_img: '',
    is_back: 0,
    person_name: '',
    card: '',
    person_code: '',
    company_name: '',
    card_img: '',
    is_card: 0,
    book_img: '',
    is_book: 0,
    is_pass: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      is_pass: options.pass
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
  getName(e){
    this.setData({
      name: e.detail.value
    })
  },
  getPersonName(e){
    this.setData({
      person_name: e.detail.value
    })
  },
  getCard(e){
    this.setData({
      card: e.detail.value
    })
  },
  getPersonCode(e){
    this.setData({
      person_code: e.detail.value
    })
  },
  getCompanyName(e){
    this.setData({
      company_name: e.detail.value
    })
  },
  chooseLicense(e){
    var that = this;
    publicFun.getImage(1,false,'album').then((res)=>{
      // uploadFile({
      //   file: res[0]
      // }).then((imgRes)=>{
      //   console.log(imgRes)
      // })
      wx.uploadFile({
        url: 'https://p.3p3.top/applet/file/upload', //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token')
        },
        success (imgRes){
          console.log(JSON.stringify(imgRes.data))
          console.log(JSON.parse(imgRes.data).data)
          let img_pic = JSON.parse(imgRes.data).data;
          that.setData({
            license: img_pic,
            is_license: 1
          })
        }
      })
    })
  },
  chooseImageFun(e){
    var that = this;
    publicFun.getImage(1,false,'album').then((res)=>{
      wx.uploadFile({
        url: 'https://p.3p3.top/applet/file/upload', //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token')
        },
        success (imgRes){
          let img_pic = JSON.parse(imgRes.data).data;
          that.setData({
            back_img: img_pic,
            is_back: 1
          })
        }
      })
    })
  },
  chooseCardImage(e){
    var that = this;
    publicFun.getImage(1,false,'album').then((res)=>{
      wx.uploadFile({
        url: 'https://p.3p3.top/applet/file/upload', //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token')
        },
        success (imgRes){
          let img_pic = JSON.parse(imgRes.data).data;
          that.setData({
            card_img: img_pic,
            is_card: 1
          })
        }
      })
    })
  },
  chooseBookImage(e){
    var that = this;
    publicFun.getImage(1,false,'album').then((res)=>{
      wx.uploadFile({
        url: 'https://p.3p3.top/applet/file/upload', //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token')
        },
        success (imgRes){
          let img_pic = JSON.parse(imgRes.data).data;
          that.setData({
            book_img: img_pic,
            is_book: 1
          })
        }
      })
    })
  },
  submitForm(e){
    var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    // if(!reg.test(this.data.card)){
    //   wx.showToast({
    //     title: '请输入正确的身份证号码',
    //     icon: 'none'
    //   })
    //   return;
    // }
    if(this.data.company_name==''){
      wx.showToast({
        title: '请输入企业名称',
        icon: 'none'
      })
      return;
    }
    if(this.data.person_name==''){
      wx.showToast({
        title: '请输入法人名称',
        icon: 'none'
      })
      return;
    }
    if(this.data.person_code==''){
      wx.showToast({
        title: '请输入统一社会信用代码',
        icon: 'none'
      })
      return;
    }
    if(this.data.license==''){
      wx.showToast({
        title: '请上传执照',
        icon: 'none'
      })
      return;
    }
    if(this.data.back_img==''){
      wx.showToast({
        title: '请上传企业图片',
        icon: 'none'
      })
      return;
    }
    addMerchantInfo({
      businessName: this.data.company_name,//企业名称
      legalPerson: this.data.person_name,//法人名称
      uscc: this.data.person_code,//统一社会信用代码
      licenseImg: this.data.license,//执照
      businessImg: this.data.back_img,//企业图片
      bossName: this.data.name,//老板名称
      idnumber: this.data.card,//身份证
      idnumberImg: this.data.card_img,//身份证图片
      authorizeImg: this.data.book_img//授权图片
    }).then(res=>{
      if(res.code == 200){
        this.setData({
          name: '',
          license: '',
          is_license: 0,
          back_img: '',
          is_back: 0,
          person_name: '',
          card: '',
          person_code: '',
          company_name: '',
          card_img: '',
          is_card: 0,
          book_img: '',
          is_book: 0,
          is_pass: 1
        })
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
      }
    })
  }
})
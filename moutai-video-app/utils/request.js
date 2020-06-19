const app = getApp();
//获取token


function getToken() {
  if (wx.getStorageSync('token') == "")
    return {}
  else {
    return {
      'Authentication': wx.getStorageSync('token') || ''
    }
  }
}

//url地址
// const requestUrl = 'https://maotaiapi.lcpower.cn';
// const requestUrl = 'http://192.168.31.115:8081';
const requestUrl = 'https://p.3p3.top';

/*
method 方法
url 地址
data 参数
header 请求头
dataType 数据格式 默认json
timeout 超时设置 默认5000ms
*/
const server = function({
  method,
  url,
  data,
  params,
  header = getToken(),
  dataType = 'json',
  timeout = 10000
}) {

  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: requestUrl + url,
      method,
      header,
      timeout,
      data: data || params,
      dataType,
      success: response => {
        let res = response.data;
        if (res.code == 401) {} else if (res.code !== 200) {
          wx.showModal({
            title: "错误",
            content: res.msg || res.message,
            showCancel: false
          })
        }
        wx.hideLoading()
        resolve(res)
      },
      fail: error => {
        wx.hideLoading()
        reject(error);
      }
    })
  })
};

export default server;
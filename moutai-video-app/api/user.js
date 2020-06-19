import request from '../utils/request'

//登录接口
export function login(data) {
  return request({
    url: "/main/user/syn/info",
    method: "POST",
    data
  })
}
//登录接口
export function getUser(data) {
  return request({
    url: "/applet/user/syn/info",
    method: "POST",
    data
  })
}
//获取当前用户信息
export function getInfo() {
  return request({
    url: "/applet/user/getInfo",
    method: "GET"
  })
}
//sessinKey
export function getSessinKey(jsCode) {
  return request({
    url: "/wx/auth/" + jsCode,
    method: "GET"
  })
}
//申请成为代理人/销售员
export function appRole(data) {
  return request({
    url: "/applet/user/applicationMemberRole",
    method: "GET",
    data
  })
}
//获取二维码
export function getCode() {
  return request({
    url: "/applicationMemberRoleTest",
    method: "GET"
  })
}
//获取用户私钥
export function getPrivateKey(data) {
  return request({
    url: "/applet/user/getPrivateKey",
    method: "GET",
    data
  })
}
//查看可以发行的促销劵列表
export function getAgentCouponList(data) {
  return request({
    url: "/applet/coupon/canBeAgentCouponList",
    method: "GET",
    data
  })
}
//促销券编辑列表
export function shoWEditCouponList() {
  return request({
    url: "/applet/coupon/showEditCouponList",
    method: "GET"
  })
}
//查看保存未发行的促销劵
export function queryEditCouponInfo(data) {
  return request({
    url: "/applet/coupon/queryEditCouponInfo",
    method: "GET",
    data
  })
}
//查看我的促销券(编辑完成)列表
export function queryEditCouponList(data) {
  return request({
    url: "/applet/coupon/queryEditCouponList",
    method: "GET",
    data
  })
}
//促销券编辑
export function editCoupon(data) {
  return request({
    url: "/applet/coupon/editCoupon",
    method: "POST",
    data
  })
}
//发行促销券
export function addCouponAgent(data) {
  return request({
    url: "/applet/coupon/addCouponAgent",
    method: "GET",
    data
  })
}
//查看已发行促销券列表(代理人查看)
export function addCouponAgentList(data) {
  return request({
    url: "/applet/coupon/queryCouponAgentList",
    method: "GET",
    data
  })
}
//查看已发行促销券列表(老板查看所用代理人)  促销券回顾
export function queryAllCouponAgentList(data) {
  return request({
    url: "/applet/coupon/queryAllCouponAgentList",
    method: "GET",
    data
  })
}
//查询成员列表
export function queryMemberList(data) {
  return request({
    url: "/applet/user/queryMemberList",
    method: "GET",
    data
  })
}
//查看促销券出售数量(老板)
export function queryAllCouponSellList(data) {
  return request({
    url: "/applet/coupon/queryAllCouponSellList",
    method: "GET",
    data
  })
}
//查看促销券出售数量(代理人)
export function queryCouponSellList(data) {
  return request({
    url: "/applet/coupon/queryCouponSellList",
    method: "GET",
    data
  })
}
//添加促销劵收藏(消费者)
export function couponCollect(data) {
  return request({
    url: "/applet/coupon/couponCollect",
    method: "GET",
    data
  })
}
//查看收藏列表
export function queryCouponCollectList(data) {
  return request({
    url: "/applet/coupon/queryCouponCollectList",
    method: "GET",
    data
  })
}
//我已购促销券
export function queryMyCouponList(data) {
  return request({
    url: "/applet/coupon/queryMyCouponList",
    method: "GET",
    data
  })
}
//查看促销券验收列表(销售员查看))--折让列表
export function queryCouponUseList(data) {
  return request({
    url: "/applet/coupon/queryCouponUseList",
    method: "GET",
    data
  })
}
//查看促销券收入列表(销售员查看))
export function querySellCouponList(data) {
  return request({
    url: "/applet/coupon/querySellCouponList",
    method: "GET",
    data
  })
}
//促销券销售(销售员))
export function couponSell(data) {
  return request({
    url: "/applet/coupon/couponSell",
    method: "GET",
    data
  })
}
//促销券验证(销售员))
export function couponConsume(data) {
  return request({
    url: "/applet/coupon/couponConsume",
    method: "GET",
    data
  })
}
//添加商家信息
export function addMerchantInfo(data) {
  return request({
    url: "/applet/user/addMerchantInfo",
    method: "POST",
    data
  })
}
//查看申请人列表
export function applicationMemberList(data) {
  return request({
    url: "/applet/user/applicationMemberList",
    method: "GET",
    data
  })
}
//获取授权证书
export function getBrowseCert(data) {
  return request({
    url: "/applet/cert/getBrowseCert",
    method: "GET",
    data
  })
}
//成员管理
export function memberManage(data) {
  return request({
    url: "/applet/user/memberManage",
    method: "GET",
    data
  })
}
//企业信息
export function queryBusinessInfo() {
  return request({
    url: "/applet/user/queryBusinessInfo",
    method: "POST"
  })
}
//文件上传
export function uploadFile(data) {
  return request({
    url: "/applet/file/upload",
    method: "POST",
    data
  })
}







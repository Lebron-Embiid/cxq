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
//更新用户手机号
export function update_phone(data) {
  return request({
    url: "/applet/update_phone",
    method: "POST",
    data
  })
}
//刷新用户信息
export function update_user_info() {
  return request({
    url: "/applet/update_user_info",
    method: "POST"
  })
}
//展示促销劵(原始图)
export function show_coupon_image(data) {
  return request({
    url: "/applet/coupon/show_coupon_image",
    method: "GET",
    data
  })
}
//展示促销劵(原始图)
export function buy_coupon(data) {
  return request({
    url: "/applet/coupon/buy_coupon",
    method: "GET",
    data
  })
}
//展示[已购]促销劵(原始图)
export function show_sell_coupon_image(data) {
  return request({
    url: "/applet/coupon/show_sell_coupon_image",
    method: "GET",
    data
  })
}

//保存促销劵图片到(客户端)手机
export function save_coupon_image(data) {
  return request({
    url: "/applet/coupon/save_coupon_image",
    method: "GET",
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
//代理人[收益]详情
export function agent_coupon_profit_info(data) {
  return request({
    url: "/applet/coupon/agent_coupon_profit_info",
    method: "GET",
    data
  })
}
//代理人[收益]列表
export function agent_coupon_profit_list(data) {
  return request({
    url: "/applet/coupon/agent_coupon_profit_list",
    method: "GET",
    data
  })
}
//销售员[折让]详情
export function seller_coupon_discount_info(data) {
  return request({
    url: "/applet/coupon/seller_coupon_discount_info",
    method: "GET",
    data
  })
}
//销售员[收益]详情
export function seller_coupon_profit_info(data) {
  return request({
    url: "/applet/coupon/seller_coupon_profit_info",
    method: "GET",
    data
  })
}
//销售员[收益列表]
export function seller_coupon_profit_list(data) {
  return request({
    url: "/applet/coupon/seller_coupon_profit_list",
    method: "GET",
    data
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
//商家背景图
export function queryBusinessImg(data) {
  return request({
    url: "/applet/user/queryBusinessImg",
    method: "GET",
    data
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
//查看保存未发行的自定义促销劵
export function query_editcoupon_list(data) {
  return request({
    url: "/applet/coupon/query_editcoupon_list",
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
//查看促销券出售列表(已出售促销劵)
export function querySellCouponListBySeller(data) {
  return request({
    url: "/applet/coupon/querySellCouponListBySeller",
    method: "GET",
    data
  })
}
//查看促销券验收列表(已验收促销劵))
export function queryUseCouponListBySeller(data) {
  return request({
    url: "/applet/coupon/queryUseCouponListBySeller",
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
//查看促销券验收列表(销售员查看))--折让列表
export function queryCouponUseList2(data) {
  return request({
    url: "/applet/coupon/queryCouponUseList2",
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
    method: "GET"
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
//用户身份二维码
export function showUserQRCode() {
  return request({
    url: "/applet/user/showUserQRCode",
    method: "POST"
  })
}
//促销券浏览
export function queryCouponBrowse(data) {
  return request({
    url: "/applet/coupon/queryCouponBrowse",
    method: "GET",
    data
  })
}
//删除促销券浏览记录
export function del_coupon_browse(data) {
  return request({
    url: "/applet/coupon/del_coupon_browse",
    method: "GET",
    data
  })
}
//删除促销券收藏记录
export function del_coupon_collect(data) {
  return request({
    url: "/applet/coupon/del_coupon_collect",
    method: "GET",
    data
  })
}
//身份切换
export function changeUserType(data) {
  return request({
    url: "/applet/user/change_user_type",
    method: "GET",
    data
  })
}
//判断是否有身份切换
export function hasUserType() {
  return request({
    url: "/applet/user/has_user_type",
    method: "GET"
  })
}
//老板-促销券删除
export function delCoupon(data) {
  return request({
    url: "/applet/coupon/del_coupon",
    method: "GET",
    data
  })
}
//代理人-促销券删除
export function delCouponAgent(data) {
  return request({
    url: "/applet/coupon/del_coupon_agent",
    method: "GET",
    data
  })
}
//操作记录-成员管理
export function member_handle_record(data) {
  return request({
    url: "/applet/user/member_handle_record",
    method: "GET",
    data
  })
}
//操作记录-促销券
export function coupon_handle_record(data) {
  return request({
    url: "/applet/coupon/coupon_handle_record",
    method: "GET",
    data
  })
}
//搜索代理人
export function search_agent(data) {
  return request({
    url: "/applet/user/search_agent",
    method: "GET",
    data
  })
}
//搜索商家
export function search_business(data) {
  return request({
    url: "/applet/user/search_business",
    method: "GET",
    data
  })
}
//邀请代理人
export function invite_agent(data) {
  return request({
    url: "/applet/user/invite_agent",
    method: "GET",
    data
  })
}
//查看代理邀请列表
export function query_agent_invite(data) {
  return request({
    url: "/applet/user/query_agent_invite",
    method: "GET",
    data
  })
}
//代理邀请管理
export function agent_invite_manage(data) {
  return request({
    url: "/applet/user/agent_invite_manage",
    method: "GET",
    data
  })
}
//代理的商家列表
export function my_business_list() {
  return request({
    url: "/applet/user/my_business_list",
    method: "GET"
  })
}
//申请成为代理人
export function apply_agent(data) {
  return request({
    url: "/applet/user/apply_agent",
    method: "GET",
    data
  })
}
//趋势图:最近七天每天每种劵出售[数量])
export function coupon_sell_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_sell_trend_chart",
    method: "GET"
  })
}
//趋势图:最近七天每天销售劵总[收益])
export function coupon_profit_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_profit_trend_chart",
    method: "GET"
  })
}
//趋势图:最近七天每天销售劵总[折让])
export function coupon_discount_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_discount_trend_chart",
    method: "GET"
  })
}
//趋势图:最近一年每月销售劵总[收益])
export function coupon_profit_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_profit_trend_chart_month",
    method: "GET"
  })
}
//趋势图:最近一年每月销售劵总[折让])
export function coupon_discount_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_discount_trend_chart_month",
    method: "GET"
  })
}
//趋势图:最近一年每月促销劵出售[数量])
export function coupon_sell_trend_chart_month() {
  return request({
    url: "/applet/coupon/coupon_sell_trend_chart_month",
    method: "GET"
  })
}
//代理人趋势图:最近七天每天销售劵总[收益])
export function coupon_agent_profit_trend_chart(data) {
  return request({
    url: "/applet/coupon/coupon_agent_profit_trend_chart",
    method: "GET",
    data
  })
}
//销售员趋势图:最近10天每天销售劵总[收益])
export function coupon_seller_profit_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_seller_profit_trend_chart",
    method: "GET"
  })
}
//销售员趋势图:最近10天每天销售劵总[折让])
export function coupon_seller_discount_trend_chart() {
  return request({
    url: "/applet/coupon/coupon_seller_discount_trend_chart",
    method: "GET"
  })
}
//店铺转让
export function business_tran(data) {
  return request({
    url: "/applet/user/business_tran",
    method: "GET",
    data
  })
}
//店铺转让信息
export function business_tran_info(data) {
  return request({
    url: "/applet/user/business_tran_info",
    method: "GET",
    data
  })
}
//[店铺转让]老板状态修改
export function business_tran_boss_status(data) {
  return request({
    url: "/applet/user/business_tran_boss_status",
    method: "GET",
    data
  })
}
//[店铺转让]接收人状态修改
export function business_tran_receiver_status(data) {
  return request({
    url: "/applet/user/business_tran_receiver_status",
    method: "GET",
    data
  })
}
//[删除]购买的优惠券
export function del_coupon_purchased(data) {
  return request({
    url: "/applet/coupon/del_coupon_purchased",
    method: "GET",
    data
  })
}
//查看无用(已过期||使用次数为0)的已购促销券
export function query_useless_coupon_list(data) {
  return request({
    url: "/applet/coupon/query_useless_coupon_list",
    method: "GET",
    data
  })
}
//查询的促销劵信息
export function query_coupon_info(data) {
  return request({
    url: "/applet/coupon/query_coupon_info",
    method: "GET",
    data
  })
}
//[店铺转让]记录
export function business_tran_record(data) {
  return request({
    url: "/applet/user/business_tran_record",
    method: "GET",
    data
  })
}
//查看用户促销劵使用记录(消费者查看)
export function query_consumer_user_coupon_list(data) {
  return request({
    url: "/applet/coupon/query_consumer_user_coupon_list",
    method: "GET",
    data
  })
}






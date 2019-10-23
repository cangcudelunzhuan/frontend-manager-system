let PREFIX = API_BASE_URL
// let PREFIX = '/proxy'
export default {
  // 发送验证码
  loginVcode: (phone) => `${PREFIX}/admin/adminUser/login/vcode/${phone}`,
  // 登录
  login: () => `${PREFIX}/admin/adminUser/login`,
  // 用户列表
  userList: (currentPage) => `${PREFIX}/admin/user/list/${currentPage}`,
  // 用户信息
  userInfo: (uid) => `${PREFIX}/admin/user/info/${uid}`,
  // 查询资金流水列表
  capitalFlowList: ({ uid, currentPage }) => `${PREFIX}/admin/user/capital/flow/list/${uid}/${currentPage}`,
  // 登记信息列表
  enregisterList: (currentPage) => `${PREFIX}/admin/trade/product/enregister/list/${currentPage}`,
  // 申购成功列表
  subscribeSuccessList: (currentPage) => `${PREFIX}/admin/trade/product/subscribe/success/list/${currentPage}`,
  // 登记信息详情
  enregisterInfo: (enregisterId) => `${PREFIX}/admin/trade/product/enregister/audit/info/${enregisterId}`,
  // 登记信息审核
  enregisterOpe: () => `${PREFIX}/admin/trade/product/enregister/audit/ope`,
  // 福利（工资宝）-用户列表
  welfareUserList: (currentPage) => `${PREFIX}/admin/welfare/user/list/${currentPage}`,
  // 福利（工资宝）-查询汇款（申购）列表
  welfareRemittanceList: (currentPage) => `${PREFIX}/admin/welfare/remittance/list/${currentPage}`,
  // 福利（工资宝）-查询赎回列表
  welfareRedeemList: (currentPage) => `${PREFIX}/admin/welfare/redeem/list/${currentPage}`,
  // 福利（工资宝）-赎回确认（标记为已转账）
  welfareRedeemConfirm: (redeemId) => `${PREFIX}/admin/welfare/redeem/transfer/ok/tag/${redeemId}`,
  // 还款管理-还款计划
  repaymentPlanList: () => `${PREFIX}/admin/trade/repayment/plan/list`,
  // 还款管理-已打款明细
  repaymentDetailConfirm: (currentPage) => `${PREFIX}/admin/trade/already/repayment/detail/list/${currentPage}`,
  // 还款管理-还款计划
  repaymentDetailUnconfirm: () => `${PREFIX}/admin/trade/no/repayment/detail/list`,
  // 还款管理-确认
  repaymentConfirm: () => `${PREFIX}/admin/trade/repayment/confirm/ope`,
  // 福利（工资宝）-查询资金存量列表（资金总览）
  welfareCapitalStockList: (currentPage) => `${PREFIX}/admin/welfare/capital/everyday/stock/list/${currentPage}`,
  // 福利（工资宝）-查询资金流水列表
  welfareCapitalFlowList: ({ uid, currentPage }) => `${PREFIX}/admin/welfare/capital/flow/list/${uid}/${currentPage}`,
  // 福利（工资宝）-汇款导入操作
  welfareRemittanceImport: () => `${PREFIX}/admin/welfare/remittance/import/Ope`,
  // 产品详情
  productDetail: (productId) => `${PREFIX}/admin/trade/product/${productId}`,
  // 产品发布
  productCreate: () => `${PREFIX}/admin/trade/product/create`,
  // 产品修改
  productUpdate: () => `${PREFIX}/admin/trade/product/update`,
  // 产品审核
  productOpe: () => `${PREFIX}/admin/trade/product/audit/ope`,
  // 产品列表
  productList: (currentPage) => `${PREFIX}/admin/trade/product/list/${currentPage}`,
  // 提交的产品列表
  productSubmitList: (currentPage) => `${PREFIX}/admin/trade/product/own/submit/list/${currentPage}`,
  // 审核产品列表
  productAuditList: (currentPage) => `${PREFIX}/admin/trade/product/own/audit/list/${currentPage}`,
  // 部分有项目列表
  projectAllList: () => `${PREFIX}/admin/project/all/list`,
  // 产品下架
  productDown: (productId) => `${PREFIX}/admin/trade/product/down/${productId}`,
  // 产品上架
  productUp: (productId) => `${PREFIX}/admin/trade/product/putaway/${productId}`,
  // 团队列表
  teamList: (currentPage) => `${PREFIX}/admin/project/team/list/${currentPage}`,
  // 团队详情
  teamDetail: (manageTeamId) => `${PREFIX}/admin/project/team/${manageTeamId}`,
  // 团队logo上传
  teamlogoUp: () => `${PREFIX}/file/upload/project/team/logo`,
  // 新增团队
  teamCreate: () => `${PREFIX}/admin/project/team/create`,
  // 修改团队
  teamUpdate: () => `${PREFIX}/admin/project/team/update`,
  // 新建项目
  projectCreate: () => `${PREFIX}/admin/project/create`,
  // 更新项目
  projectUpdate: () => `${PREFIX}/admin/project/update`,
  // 项目详情
  projectDetail: (projectId) => `${PREFIX}/admin/project/${projectId}`,
  // 全部管理团队列表
  projectTeamListAll: () => `${PREFIX}/admin/project/team/all/list`,
  // 项目上传banner图
  projectBannerUpload: () => `${PREFIX}/file/upload/project/banner`,
  // 审核项目
  projectOpe: () => `${PREFIX}/admin/project/audit/ope`,
  // 项目列表
  projectList: (currentPage) => `${PREFIX}/admin/project/list/${currentPage}`,
  // 我提交的项目列表
  projectSubmitList: (currentPage) => `${PREFIX}/admin/project/own/submit/list/${currentPage}`,
  // 我审核的项目列表
  projectReviewList: (currentPage) => `${PREFIX}/admin/project/own/audit/list/${currentPage}`,
  // 项目上架
  projectUp: (projectId) => `${PREFIX}/admin/project/putaway/${projectId}`,
  // 项目下架
  projectDown: (projectId) => `${PREFIX}/admin/project/down/${projectId}`
}

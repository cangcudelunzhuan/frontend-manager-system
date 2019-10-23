import Vue from 'vue'
import Router from 'vue-router'

import { getStorage } from '@/utils/storage'

const index = () => import('@/views/index') // 站内入口
const home = () => import('@/views/home') // 首页
const login = () => import('@/views/login') // 登录页
const userList = () => import('@/views/user/userList') // 用户管理-用户列表
const userInfo = () => import('@/views/user/userInfo') // 用户详情
const welfareUserList = () => import('@/views/user/welfareUserList') // 用户管理-用户列表（工资宝）
const welfareUserInfo = () => import('@/views/user/welfareUserInfo') // 用户详情（工资宝）
const enregisterList = () => import('@/views/purchase/enregisterList') // 申购管理-开放登记
const subscribeSuccessList = () => import('@/views/purchase/subscribeSuccessList') // 申购管理-申购成功
const welfareRemittanceList = () => import('@/views/purchase/welfareRemittanceList') // 申购管理-申购登记（工资宝）
const welfareRedeemList = () => import('@/views/repayment/welfareRedeemList') // 还款管理-赎回列表（工资宝）
const welfareCapitalStockList = () => import('@/views/repayment/welfareCapitalStockList') // 还款管理-资金总览（工资宝）
const repaymentPlanList = () => import('@/views/repayment/repaymentPlanList') // 还款管理-还款计划
const repaymentDetailConfirm = () => import('@/views/repayment/repaymentDetailConfirm') // 还款管理-已打款明细
const repaymentDetailUnconfirm = () => import('@/views/repayment/repaymentDetailUnconfirm') // 还款管理-待打款明细
const productList = () => import('@/views/product/productList') // 产品管理-产品列表
const productAdd = () => import('@/views/product/productAdd') // 产品管理-产品编辑
const productSubmitList = () => import('@/views/product/productSubmitList') // 产品管理-提交产品列表
const productExamineList = () => import('@/views/product/productExamineList') // 产品管理-审核产品列表
const projectList = () => import('@/views/project/projectList') // 项目管理-项目列表
const projectSubmitList = () => import('@/views/project/projectSubmitList') // 项目管理-我提交的项目
const projectReviewList = () => import('@/views/project/projectReviewList') // 项目管理-我审核的项目
const projectEdit = () => import('@/views/project/projectEdit') // 项目管理-新增、修改项目
const projectReview = () => import('@/views/project/projectReview') // 项目管理-审核项目
const projectInfo = () => import('@/views/project/projectInfo') // 项目管理-项目详情
const teamAdmin = () => import('@/views/config/team/teamAdmin') // 配置管理-团队管理
const teamDetail = () => import('@/views/config/team/teamDetail') // 配置管理-团队详情
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: index,
    beforeEnter: (to, from, next) => {
      if (!getStorage('token')) {
        next({ name: 'login' })
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'home',
        component: home
      },
      {
        path: 'user/list',
        name: 'userList',
        component: userList
      },
      {
        path: 'user/list/welfare',
        name: 'welfareUserList',
        component: welfareUserList
      },
      {
        path: 'user/:uid',
        name: 'userInfo',
        component: userInfo
      },
      {
        path: 'user/welfare/:uid',
        name: 'welfareUserInfo',
        component: welfareUserInfo
      },
      {
        path: 'purchase/enregister/list',
        name: 'enregisterList',
        component: enregisterList
      },
      {
        path: 'purchase/subscribeSuccess/list',
        name: 'subscribeSuccessList',
        component: subscribeSuccessList
      },
      {
        path: 'purchase/welfareRemittance',
        name: 'welfareRemittanceList',
        component: welfareRemittanceList
      },
      {
        path: 'repayment/welfareRedeem/list',
        name: 'welfareRedeemList',
        component: welfareRedeemList
      },
      {
        path: 'repayment/welfareCapitalStock/list',
        name: 'welfareCapitalStockList',
        component: welfareCapitalStockList
      },
      {
        path: 'repayment/repaymentPlanList',
        name: 'repaymentPlanList',
        component: repaymentPlanList
      },
      {
        path: 'repayment/repaymentDetailConfirm',
        name: 'repaymentDetailConfirm',
        component: repaymentDetailConfirm
      },
      {
        path: 'repayment/repaymentDetailUnconfirm',
        name: 'repaymentDetailUnconfirm',
        component: repaymentDetailUnconfirm
      },
      {
        path: 'productAndProject/productList',
        name: 'productList',
        component: productList
      },
      {
        path: 'productAndProject/productAdd',
        name: 'productAdd',
        component: productAdd
      },
      {
        path: 'productAndProject/productSubmitList',
        name: 'productSubmitList',
        component: productSubmitList
      },
      {
        path: 'productAndProject/productExamineList',
        name: 'productExamineList',
        component: productExamineList
      },
      {
        path: 'productAndProject/projectList',
        name: 'projectList',
        component: projectList
      },
      {
        path: 'productAndProject/projectSubmitList',
        name: 'projectSubmitList',
        component: projectSubmitList
      },
      {
        path: 'productAndProject/projectReviewList',
        name: 'projectReviewList',
        component: projectReviewList
      },
      {
        path: 'productAndProject/projectEdit/:projectId?',
        name: 'projectEdit',
        component: projectEdit
      },
      {
        path: 'productAndProject/projectReview/:projectId',
        name: 'projectReview',
        component: projectReview
      },
      {
        path: 'productAndProject/projectInfo/:projectId',
        name: 'projectInfo',
        component: projectInfo
      },
      {
        path: 'config/team/teamAdmin',
        name: 'teamAdmin',
        component: teamAdmin
      },
      {
        path: 'config/team/teamDetail',
        name: 'teamDetail',
        component: teamDetail
      }
    ]
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    beforeEnter: (to, from, next) => {
      if (getStorage('token')) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }]
})

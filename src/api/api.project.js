// 项目管理
import http from '@/utils/http'
import apiPath from './path.config'

/**
 * 新建项目
 */
export function projectCreate ({
  bannerImgUrl,
  guaranteeIntroduce,
  location,
  manageTeamId,
  name,
  projectIntroduce,
  raiseAmount,
  relatedMediaInfo,
  relatedMediaUrl,
  subjectIntroduce
}) {
  return http({
    method: 'POST',
    url: apiPath['projectCreate'](),
    data: {
      bannerImgUrl,
      guaranteeIntroduce,
      location,
      manageTeamId,
      name,
      projectIntroduce,
      raiseAmount,
      relatedMediaInfo,
      relatedMediaUrl,
      subjectIntroduce
    }
  })
}

/**
 * 更新项目
 */
export function projectUpdate ({
  projectId,
  bannerImgUrl,
  guaranteeIntroduce,
  location,
  manageTeamId,
  name,
  projectIntroduce,
  raiseAmount,
  relatedMediaInfo,
  relatedMediaUrl,
  subjectIntroduce
}) {
  return http({
    method: 'PUT',
    url: apiPath['projectUpdate'](),
    data: {
      projectId,
      bannerImgUrl,
      guaranteeIntroduce,
      location,
      manageTeamId,
      name,
      projectIntroduce,
      raiseAmount,
      relatedMediaInfo,
      relatedMediaUrl,
      subjectIntroduce
    }
  })
}

/**
 * 审核项目
 */
export function projectOpe ({
  projectId,
  status,
  reason
}) {
  return http({
    method: 'PUT',
    url: apiPath['projectOpe'](),
    data: {
      projectId,
      status,
      reason
    }
  })
}

/**
 * 上传项目banner图
 */
export function projectBannerUpload (file) {
  return http({
    method: 'POST',
    url: apiPath['projectBannerUpload'](),
    data: file
  })
}

/**
 * 项目详情
 */
export function getProjectDetail (projectId) {
  return http({
    url: apiPath['projectDetail'](projectId)
  })
}

/**
 * 全部管理团队列表
 */
export function getProjectTeamListAll () {
  return http({
    url: apiPath['projectTeamListAll']()
  })
}

/**
 * 项目列表
 */
export function getProjectList ({
  currentPage,
  name,
  location,
  manageTeamName,
  status,
  auditResult,
  startTime,
  endTime
}) {
  return http({
    url: apiPath['projectList'](currentPage),
    query: {
      name,
      location,
      manageTeamName,
      status,
      auditResult,
      startTime,
      endTime
    }
  })
}
/**
 * 我提交的项目列表
 */
export function getProjectSubmitList ({
  currentPage,
  name,
  location,
  manageTeamName,
  status,
  auditResult,
  startTime,
  endTime
}) {
  return http({
    url: apiPath['projectSubmitList'](currentPage),
    query: {
      name,
      location,
      manageTeamName,
      status,
      auditResult,
      startTime,
      endTime
    }
  })
}
/**
 * 我审核的项目列表
 */
export function getProjectReviewList ({
  currentPage,
  name,
  location,
  manageTeamName,
  status,
  auditResult,
  startTime,
  endTime
}) {
  console.log(JSON.stringify({
    currentPage,
    name,
    location,
    manageTeamName,
    status,
    auditResult,
    startTime,
    endTime
  }))
  return http({
    url: apiPath['projectReviewList'](currentPage),
    query: {
      name,
      location,
      manageTeamName,
      status,
      auditResult,
      startTime,
      endTime
    }
  })
}
/**
 * 项目上架
 */
export function projectUp (projectId) {
  return http({
    method: 'PUT',
    url: apiPath['projectUp'](projectId)
  })
}
/**
 * 项目下架
 */
export function projectDown (projectId) {
  return http({
    method: 'PUT',
    url: apiPath['projectDown'](projectId)
  })
}

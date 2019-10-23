<template lang="pug">
  div
    a-table(
      :rowKey="record => record.projectId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      :locale="{filterConfirm: '确认', filterReset: '重置'}"
      @change="handleTableChange")
      a(
        slot="name"
        slot-scope="text, record"
        href="javascript:;"
        @click="$router.push({ name: 'projectInfo', params: { projectId: record.projectId }})") {{record.name}}
      .custom-filter-dropdown(slot="filterSearch" slot-scope="{setSelectedKeys, selectedKeys, confirm, clearFilters, column }")
        a-input(
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          style="width: 188px; margin-bottom: 8px; display: block;")
        a-button(
          type='primary'
          icon="search"
          size="small"
          @click="handleSearch(confirm)"
          style="width: 90px; margin-right: 8px") 确定
        a-button(
          @click="handleReset(clearFilters)"
          size="small"
          style="width: 90px") 取消

      .custom-filter-dropdown(slot="filterDate" slot-scope="{setSelectedKeys, selectedKeys, confirm, clearFilters, column }")
        a-range-picker(
          :placeholder="['开始时间', '结束时间']"
          style="width: 260px; margin-bottom: 8px; display: block;"
          @change="handleDateRangeChange")
        a-button(
          @click="handleSearch(confirm, 'dateRange')"
          type='primary'
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px") 确定
        a-button(
          @click="handleReset(clearFilters, 'dateRange')"
          size="small"
          style="width: 90px") 取消

      a-icon(slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" )
      a-tag(
        slot="status"
        slot-scope="text, record") {{ getStatusTextByValue(record.status) }}
      a-tag(
        slot="auditResult"
        slot-scope="text, record") {{ getAuditTextByValue(record.auditResult) }}
      template(slot="raiseAmount" slot-scope="text, record")
        span {{record.raiseAmount|money}} 元
      a(
        slot="action"
        slot-scope="text, record"
        href="javascript:;"
        @click="edit(record.projectId)") {{ record.auditResult + '' !== '3' ? '修改' : ''}}
</template>

<script>
import { getProjectSubmitList } from '@/api/api.project'

const statusMap = [
  { text: '全部', value: '' },
  { text: '待上架', value: '1' },
  { text: '上架', value: '2' },
  { text: '下架', value: '3' }
]

const auditResultMap = [
  { text: '全部', value: '' },
  { text: '暂未审核', value: '1' },
  { text: '不通过', value: '2' },
  { text: '通过', value: '3' }
]

export default {
  data () {
    return {
      loading: false,
      columns: [{
        title: '项目名称',
        dataIndex: 'name',
        width: 150,
        scopedSlots: {
          customRender: 'name',
          filterDropdown: 'filterSearch',
          filterIcon: 'filterIcon'
        }
      }, {
        title: '募集金额',
        dataIndex: 'raiseAmount',
        width: 150,
        scopedSlots: {
          customRender: 'raiseAmount'
        }
      }, {
        title: '所在地',
        dataIndex: 'location',
        width: 150,
        scopedSlots: {
          filterDropdown: 'filterSearch',
          filterIcon: 'filterIcon'
        }
      }, {
        title: '管理团队',
        dataIndex: 'manageTeamName',
        width: 150,
        scopedSlots: {
          filterDropdown: 'filterSearch',
          filterIcon: 'filterIcon'
        }
      }, {
        title: '提交时间',
        dataIndex: 'createTime',
        width: 150,
        scopedSlots: {
          filterDropdown: 'filterDate',
          filterIcon: 'filterIcon'
        }
      }, {
        title: '项目状态',
        dataIndex: 'status',
        scopedSlots: {
          customRender: 'status'
        },
        width: 150,
        filters: statusMap,
        filterMultiple: false
      }, {
        title: '审核结果',
        dataIndex: 'auditResult',
        scopedSlots: {
          customRender: 'auditResult'
        },
        width: 150,
        filters: auditResultMap,
        filterMultiple: false
      }, {
        title: '操作',
        scopedSlots: {
          customRender: 'action'
        },
        width: 80
      }],
      data: [],
      filter: {
        name: '',
        location: '',
        manageTeamName: '',
        status: '',
        auditResult: '',
        startTime: '',
        endTime: ''
      },
      pagination: {}
    }
  },
  created () {
    this.fetchProjectList()
  },
  methods: {
    fetchProjectList () {
      let formData = {...this.filter}
      formData.currentPage = this.pagination.current || 1
      this.loading = true
      getProjectSubmitList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    handleSearch (confirm, type) {
      confirm()
      type === 'dateRange' && this.fetchProjectList()
    },
    handleReset (clearFilters, type) {
      clearFilters()
      this.filter.startTime = ''
      this.filter.endTime = ''
      type === 'dateRange' && this.fetchProjectList()
    },
    handleTableChange (pagination, filters) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      for (let key in this.filter) {
        filters[key] && (this.filter[key] = filters[key][0])
      }
      this.fetchProjectList()
    },
    handleDateRangeChange (date, dateString) {
      this.filter.startTime = dateString[0]
      this.filter.endTime = dateString[1]
    },
    getStatusTextByValue (val) {
      return (statusMap.find(elem => elem.value === val + '') || {}).text
    },
    getAuditTextByValue (val) {
      return (auditResultMap.find(elem => elem.value === val + '') || {}).text
    },
    edit (projectId) {
      this.$router.push({
        name: 'projectEdit',
        params: { projectId }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.filter-btn-wrap {
  margin-bottom:30px;
  display: flex;
  justify-content: flex-end;
  .ant-btn{
    margin-left: 20px
  }
}
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}
</style>

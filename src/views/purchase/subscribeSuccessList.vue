<template>
  <div>
    <a-row v-if="refresh">
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">手机号：</label>
        <a-input placeholder="请输入用户手机号" v-model="filter.phone"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">姓名：</label>
        <a-input placeholder="请输入用户姓名" v-model="filter.userName"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">产品名称：</label>
        <a-input placeholder="请输入产品名称" v-model="filter.productName"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
       <label class="filter-col_label"> 时间：</label>
        <a-range-picker
          ref="dateRange"
          style="width:100%"
          :placeholder="['开始时间', '结束时间']"
          @change="handleDateRangeChange"/>
      </a-col>
    </a-row>

    <div class="filter-btn-wrap">
      <a-button type="primary" @click="searchfetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="record => record.enregisterId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>
  </div>
</template>

<script>
import { getSubscribeSuccessList } from '@/api/api.enregister'

const columns = [{
  title: '用户姓名',
  dataIndex: 'userName'
}, {
  title: '手机号',
  dataIndex: 'phoneShow'
}, {
  title: '产品名称',
  dataIndex: 'productName'
}, {
  title: '申购时间',
  dataIndex: 'createTime'
}, {
  title: '申购份额',
  dataIndex: 'enregisterShare'
}, {
  title: '拼团加息（%）',
  dataIndex: 'togetherSuperpositionRate',
  scopedSlots: { customRender: 'togetherSuperpositionRate' }
}, {
  title: '历史年化（%）',
  dataIndex: 'historyRate',
  scopedSlots: { customRender: 'historyRate' }
}, {
  title: '封闭期',
  dataIndex: 'lockPeriod',
  scopedSlots: { customRender: 'lockPeriod' }
}, {
  title: '存续周期',
  dataIndex: 'survivalPeriod'
}, {
  title: '期满收益',
  dataIndex: 'income'
}]

export default {
  data () {
    return {
      refresh: true,
      data: [],
      filter: {
        userName: '',
        phone: '',
        productName: '',
        subscribeStartDate: '',
        subscribeEndDate: ''
      },
      pagination: {},
      loading: false,
      columns
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    handleDateRangeChange (date, dateString) {
      this.filter.subscribeStartDate = dateString[0]
      this.filter.subscribeEndDate = dateString[1]
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetchList()
    },
    searchfetch () {
      this.$set(this.pagination, 'current', 1)
      this.fetchList()
    },
    fetchList () {
      let formData = {...this.filter}
      formData.currentPage = this.pagination.current || 1
      this.loading = true
      getSubscribeSuccessList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    reset () {
      for (let key in this.filter) {
        this.filter[key] = ''
      }
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  }
}
</script>

<style lang="less">
.filter-col {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding-right: 20px;
  &_label {
    width: 100px;
  }
}
.filter-btn-wrap {
  padding-right: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  .ant-btn {
    margin-left: 20px;
  }
}
</style>

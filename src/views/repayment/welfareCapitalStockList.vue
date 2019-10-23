<template>
  <div>
    <a-row v-if="refresh">
      <a-col class="filter-col" :xs="24" :lg="12" :xl="12" :xxl="8">
       <label class="filter-col_label"> 日期：</label>
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
      :rowKey="record => record.estockId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>
  </div>
</template>

<script>
import { getWelfareCapitalStockList } from '@/api/api.welfare'

const columns = [{
  title: '日期',
  dataIndex: 'stockDate'
}, {
  title: '当日存量',
  dataIndex: 'stockTotalAmount'
}, {
  title: '当日新增申购量',
  dataIndex: 'remittanceTotalAmount'
}, {
  title: '当日新增赎回量',
  dataIndex: 'redeemTotalAmount'
}]

export default {
  data () {
    return {
      refresh: true,
      data: [],
      filter: {
        stockStartDate: '',
        stockEndDate: ''
      },
      pagination: {},
      loading: false,
      columns
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    handleDateRangeChange (date, dateString) {
      this.filter.stockStartDate = dateString[0]
      this.filter.stockEndDate = dateString[1]
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch()
    },
    searchfetch () {
      this.$set(this.pagination, 'current', 1)
      this.fetch()
    },
    fetch () {
      let formData = {...this.filter}
      formData.currentPage = this.pagination.current || 1
      this.loading = true
      getWelfareCapitalStockList(formData).then(({ data }) => {
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

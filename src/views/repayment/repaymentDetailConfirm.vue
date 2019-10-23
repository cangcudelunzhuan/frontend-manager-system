<template>
  <div>
    <a-row v-if="refresh">
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">姓名：</label>
        <a-input placeholder="请输入用户姓名" v-model="filter.uname"/>
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
      :rowKey="(record, index) => index"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>
  </div>
</template>

<script>
import { getRepaymentDetailConfirm } from '@/api/api.repayment'

const columns = [{
  title: '时间',
  dataIndex: 'repaymentTime'
}, {
  title: '产品名称',
  dataIndex: 'productName'
}, {
  title: '姓名',
  dataIndex: 'uname'
}, {
  title: '银行信息',
  dataIndex: 'bankInfo'
}, {
  title: '应还本金',
  dataIndex: 'redeemAmount'
}, {
  title: '应还收益',
  dataIndex: 'income'
}, {
  title: '违约费用',
  dataIndex: 'redeemPenaltyAmount'
}, {
  title: '打款金额',
  dataIndex: 'repaymentAmount'
}]

export default {
  data () {
    return {
      refresh: true,
      data: [],
      filter: {
        startTime: '',
        endTime: '',
        uname: ''
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
      this.filter.startTime = dateString[0]
      this.filter.endTime = dateString[1]
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
      getRepaymentDetailConfirm(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    // handleConfirm (item) {
    //   welfareRedeemConfirm({
    //     redeemId: item.redeemId
    //   }).then(() => {
    //     this.$message.success('操作成功！')
    //     this.fetch()
    //   })
    // },
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

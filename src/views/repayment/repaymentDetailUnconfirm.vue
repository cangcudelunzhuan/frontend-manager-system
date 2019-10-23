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
      <a-button type="primary" @click="fetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="(record, index) => index"
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange">
      <template slot="action" slot-scope="text, record">
        <a-popconfirm title="确定已打款吗？" @confirm="handleConfirm(record)" okText="是" cancelText="否">
          <a href="javascript:;">确认</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getRepaymentDetailUnconfirm, repaymentConfirm } from '@/api/api.repayment'

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
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  data () {
    return {
      refresh: true,
      data: [],
      filter: {
        repaymentStartDate: '',
        repaymentEndDate: '',
        uname: ''
      },
      // pagination: {},
      loading: false,
      columns
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    handleDateRangeChange (date, dateString) {
      this.filter.repaymentStartDate = dateString[0]
      this.filter.repaymentEndDate = dateString[1]
    },
    handleTableChange (pagination) {
      // const pager = { ...this.pagination }
      // pager.current = pagination.current
      // this.pagination = pager
      this.fetch()
    },
    fetch () {
      let formData = {...this.filter}
      // formData.currentPage = this.pagination.current || 1
      this.loading = true
      getRepaymentDetailUnconfirm(formData).then(({ data }) => {
        // const pagination = { ...this.pagination }
        // pagination.total = data.pagination.total
        this.loading = false
        this.data = data
        // this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    handleConfirm (item) {
      repaymentConfirm({
        id: item.id,
        type: item.type,
        repaymentAmount: item.repaymentAmount,
        repaymentTime: item.repaymentTime
      }).then(() => {
        this.$message.success('操作成功！')
        this.fetch()
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

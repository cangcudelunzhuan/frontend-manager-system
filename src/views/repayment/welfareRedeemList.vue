<template>
  <div>
    <a-row v-if="refresh">
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">手机号：</label>
        <a-input placeholder="请输入用户手机号" v-model="filter.phone"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">姓名：</label>
        <a-input placeholder="请输入用户姓名" v-model="filter.name"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
       <label class="filter-col_label"> 赎回时间：</label>
        <a-range-picker
          ref="dateRange"
          style="width:100%"
          :placeholder="['开始时间', '结束时间']"
          @change="handleDateRangeChange"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">打款状态：</label>
        <a-select placeholder="请选择打款状态" v-model="filter.remittanceStatus" style="width: 100%;" @change="handleSelectChange">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="(item, index) in remittanceStatusMap" :value="item.value" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <div class="filter-btn-wrap">
      <a-button type="primary" @click="searchfetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="record => record.redeemId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
      <template slot="remittanceStatus" slot-scope="text, record">
        <a-tag :color="record.remittanceStatus == '1' ? 'orange':'blue'">{{getRemittanceStatusByValue(record.remittanceStatus)}}</a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm v-if="record.remittanceStatus == '1'" title="确定已汇款吗？" @confirm="handleConfirm(record)" okText="是" cancelText="否">
          <a href="javascript:;">确认</a>
        </a-popconfirm>
        <span v-else>已确认</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getWelfareRedeemList, welfareRedeemConfirm } from '@/api/api.welfare'

const columns = [{
  title: '用户姓名',
  dataIndex: 'redeemUname'
}, {
  title: '手机号',
  dataIndex: 'redeemUphone'
}, {
  title: '银行卡号',
  dataIndex: 'redeemBankAccount'
}, {
  title: '银行卡信息',
  dataIndex: 'redeemBankInfo'
}, {
  title: '赎回时间',
  dataIndex: 'createTime'
}, {
  title: '赎回金额（元）',
  dataIndex: 'redeemAmount'
}, {
  title: '打款状态',
  dataIndex: 'remittanceStatus',
  scopedSlots: { customRender: 'remittanceStatus' }
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
        redeemStartTime: '',
        redeemEndTime: '',
        name: '',
        phone: '',
        remittanceStatus: ''
      },
      remittanceStatusMap: [{
        value: 1,
        name: '待汇款'
      }, {
        value: 2,
        name: '已汇款'
      }],
      pagination: {},
      loading: false,
      columns
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    getRemittanceStatusByValue (value) {
      return (this.remittanceStatusMap.find(elem => elem.value === value - 0) || {}).name
    },
    handleSelectChange (value) {
      this.filter.remittanceStatus = value
    },
    handleDateRangeChange (date, dateString) {
      this.filter.redeemStartTime = dateString[0]
      this.filter.redeemEndTime = dateString[1]
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
      getWelfareRedeemList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    handleConfirm (item) {
      welfareRedeemConfirm({
        redeemId: item.redeemId
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

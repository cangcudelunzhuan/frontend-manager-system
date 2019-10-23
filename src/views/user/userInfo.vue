<template>
  <div>
    <h3>身份信息</h3>
    <a-row v-if="refresh">
      <a-col :xs="24" :lg="10" :xl="4">
        <p>姓名：{{userInfo.name}}</p>
      </a-col>
      <a-col :xs="24" :lg="14" :xl="7">
        <p>身份证号：{{userInfo.identityNumShow}}</p>
      </a-col>
      <a-col :xs="24" :lg="10" :xl="5">
        <p>手机号：{{userInfo.phoneShow}}</p>
      </a-col>
      <a-col :xs="24" :lg="14" :xl="8">
        <p>银行卡号：{{userInfo.bankAccount}}</p>
      </a-col>
      <a-col :xs="24" :lg="10" :xl="4">
        <p>实名认证时间：{{userInfo.realNameTime}}</p>
      </a-col>
      <a-col :xs="24" :lg="14" :xl="20">
        <p>银行卡号信息：{{userInfo.bankInfo}}</p>
      </a-col>
    </a-row>
    <a-divider />
    <h3>交易记录</h3>
    <a-row v-if="refresh">
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
       <label class="filter-col_label"> 交易时间：</label>
        <a-range-picker
          ref="dateRange"
          style="width:100%"
          :placeholder="['开始时间', '结束时间']"
          @change="handleDateRangeChange"/>
      </a-col>
      <a-col class="filter-col" :xs="24" :lg="12" :xl="8" :xxl="6">
        <label class="filter-col_label">交易类型：</label>
        <a-select placeholder="请选择实名情况" v-model="filter.businessLargeType" style="width: 100%;" @change="handleSelectChange">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="(item, index) in businessTypeMap" :value="item.value" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <div class="filter-btn-wrap">
      <a-button type="primary" @click="searchfetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="record => record.flowId"
      :columns="columns"
      :dataSource="capitalFlowData"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>
  </div>
</template>

<script>
import { getUserInfo, getCapitalFlowList } from '@/api/api.user'

const columns = [{
  title: '交易时间',
  dataIndex: 'createTime'
}, {
  title: '交易流水',
  dataIndex: 'flowId'
}, {
  title: '产品名称',
  dataIndex: 'productName'
}, {
  title: '交易金额（元）',
  dataIndex: 'flowAmount'
}, {
  title: '交易类型',
  dataIndex: 'businessLargeTypeCn'
}]

export default {
  data () {
    return {
      refresh: true,
      userInfo: {
        name: '',
        phoneShow: '',
        identityNumShow: '',
        bankAccount: ''
      },
      capitalFlowData: [],
      businessTypeMap: [{
        value: 'DECLARE_TYPE',
        name: '申购'
      }, {
        value: 'REDEEM_TYPE',
        name: '赎回'
      }, {
        value: 'INVEST_INCOME_TYPE',
        name: '收益'
      }],
      filter: {
        flowStartTime: '',
        flowEndTime: '',
        businessLargeType: ''
      },
      pagination: {},
      loading: false,
      columns
    }
  },
  created () {
    this.fetchUserInfo()
    this.fetchCapitalFlow()
  },
  methods: {
    handleSelectChange (value) {
      this.filter.businessLargeType = value
    },
    handleDateRangeChange (date, dateString) {
      this.filter.flowStartTime = dateString[0]
      this.filter.flowEndTime = dateString[1]
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetchCapitalFlow()
    },
    fetchUserInfo () {
      getUserInfo(this.$route.params.uid).then(({ data }) => {
        this.userInfo = Object.assign({}, data)
      })
    },
    searchfetch () {
      this.$set(this.pagination, 'current', 1)
      this.fetchCapitalFlow()
    },
    fetchCapitalFlow () {
      let formData = {...this.filter}
      formData.uid = this.$route.params.uid
      formData.currentPage = this.pagination.current || 1
      this.loading = true
      getCapitalFlowList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.capitalFlowData = data.list
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

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
      <template slot="historyRate" slot-scope="text, record">
        {{record.historyRate || 0}}%
      </template>
      <template slot="enregisterRate" slot-scope="text, record">
        {{record.enregisterRate || 0}}%
      </template>
      <template slot="togetheSuperpositionRate" slot-scope="text, record">
        {{record.togetheSuperpositionRate || 0}}%
      </template>
      <template slot="status" slot-scope="text, record">
        <a-tag :color="statusMap[record.status].color">{{statusMap[record.status].text}}</a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="handleOpt(record)">{{record.status === '1' ? '审核' : '查看'}}</a>
      </template>
    </a-table>

    <a-modal
      wrapClassName="modal-enregister-info"
      title="申购审核"
      width="700px"
      v-model="modalVisible">
      <div>用户手机号：{{enregisterInfo.phone}}</div>
      <div>用户姓名：{{enregisterInfo.name}}</div>
      <div>证件号码：{{enregisterInfo.identityNum}}</div>
      <div>银行账号：{{enregisterInfo.bankAccount}}</div>
      <div>支行名称：{{enregisterInfo.bankBranch}}</div>
      <div>登记金额（元）：{{enregisterInfo.enregisterAmount}}</div>
      <a-divider />
      <div class="form-item">
        申购审核：
         <a-radio-group v-model="enregisterForm.resultStatus" :disabled="formDisabled">
          <a-radio :value="1">审核通过</a-radio>
          <a-radio :value="2">审核不通过</a-radio>
        </a-radio-group>
      </div>
      <div>
        <a-textarea placeholder="审核意见（选填）" :autosize="{ minRows: 2, maxRows: 6 }" v-model="enregisterForm.remarks" :disabled="formDisabled"/>
      </div>

      <div slot="footer">
        <a-button @click="modalVisible = false">取消</a-button>
        <a-button type="primary" @click="handleEnregisterOk" :loading="submitLoading">确认</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getEnregisterList, getEnregisterInfo, submitEnregisterResult } from '@/api/api.enregister'

const columns = [{
  title: '用户姓名',
  dataIndex: 'userNameShow'
}, {
  title: '用户手机号',
  dataIndex: 'userPhoneShow'
}, {
  title: '产品名称',
  dataIndex: 'productName'
}, {
  title: '历史年化',
  dataIndex: 'historyRate',
  scopedSlots: { customRender: 'historyRate' }
}, {
  title: '预期年化',
  dataIndex: 'enregisterRate',
  scopedSlots: { customRender: 'enregisterRate' }
}, {
  title: '登记金额（元）',
  dataIndex: 'enregisterAmount'
}, {
  title: '剩余可投（元）',
  dataIndex: 'surplusAmount'
}, {
  title: '登记时间',
  dataIndex: 'createTime'
}, {
  title: '拼团加息',
  dataIndex: 'togetheSuperpositionRate',
  scopedSlots: { customRender: 'togetheSuperpositionRate' }
}, {
  title: '审核状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
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
        userName: '',
        phone: '',
        enregisterStartDate: '',
        enregisterEndDate: ''
      },
      statusMap: {
        '1': {
          'color': 'orange',
          'text': '待审核'
        },
        '2': {
          'color': 'blue',
          'text': '审核成功'
        },
        '3': {
          'color': 'red',
          'text': '审核失败'
        }
      },
      pagination: {},
      loading: false,
      columns,
      modalVisible: false,
      formDisabled: true,
      enregisterInfo: {
        bankAccount: '',
        bankBranch: '',
        enregisterAmount: '',
        identityNum: '',
        name: '',
        phone: ''
      },
      submitLoading: false,
      enregisterForm: {
        enregisterId: '',
        resultStatus: 1, // 1:审核通过、2:审核不通过
        remarks: ''
      }
    }
  },
  created () {
    this.fetchEnregisterList()
  },
  methods: {
    handleDateRangeChange (date, dateString) {
      this.filter.enregisterStartDate = dateString[0]
      this.filter.enregisterEndDate = dateString[1]
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetchEnregisterList()
    },
    handleOpt (item) {
      this.formDisabled = true
      this.enregisterForm.enregisterId = item.enregisterId
      this.enregisterForm.resultStatus = item.status - 1 || 1
      this.enregisterForm.remarks = item.remarks || ''
      item.status === '1' && (this.formDisabled = false)
      this.modalVisible = true
      this.fetchEnregisterInfo(item.enregisterId)
    },
    searchfetch () {
      this.$set(this.pagination, 'current', 1)
      this.fetchEnregisterList()
    },
    fetchEnregisterList () {
      let formData = {...this.filter}
      formData.currentPage = this.pagination.current || 1
      this.loading = true
      getEnregisterList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    fetchEnregisterInfo (enregisterId) {
      getEnregisterInfo(enregisterId).then(({ data }) => {
        this.enregisterInfo = data
      })
    },
    handleEnregisterOk () {
      if (this.formDisabled) {
        this.modalVisible = false
        return
      }
      this.submitLoading = true
      submitEnregisterResult(this.enregisterForm).then(() => {
        this.modalVisible = false
        this.submitLoading = false
        this.$message.success('操作成功！')
        this.fetchEnregisterList()
      }).catch(() => {
        this.submitLoading = false
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
.modal-enregister-info {
  .form-item {
    margin-bottom: 20px;
  }
}
</style>

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
       <label class="filter-col_label"> 申购时间：</label>
        <a-range-picker
          ref="dateRange"
          style="width:100%"
          :placeholder="['开始时间', '结束时间']"
          @change="handleDateRangeChange"/>
      </a-col>
    </a-row>

    <div class="filter-btn-wrap">
      <a-upload
        name="file"
        :fileList="fileList"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
        @change="handleUploadChange">
        <a-button :disabled="uploading">
          <a-icon type="upload"/> 导入
        </a-button>
      </a-upload>
      <a-button type="primary" @click="searchfetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="record => record.remittanceId"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>

    <a-modal
      wrapClassName="modal-import-results"
      title="部分条目导入失败原因"
      okText="确定"
      width="700px"
      :footer="null"
      v-model="importResultModalVisible">
      <a-table
        :rowKey="(record, index) => index"
        :columns="columnsImportResults"
        :dataSource="importResults"
        :pagination="false">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { getWelfareRemittanceList, importWelfareRemittance } from '@/api/api.welfare'

const columns = [{
  title: '姓名',
  dataIndex: 'remittanceUname'
}, {
  title: '手机号',
  dataIndex: 'remittanceUphone'
}, {
  title: '银行卡号',
  dataIndex: 'remittanceBankAccount'
}, {
  title: '转账时间',
  dataIndex: 'remittanceTime'
}, {
  title: '申购时间',
  dataIndex: 'createTime'
}, {
  title: '申购金额（元）',
  dataIndex: 'remittanceAmount'
}, {
  title: '备注',
  dataIndex: 'remarks'
}]

const columnsImportResults = [{
  title: '姓名',
  dataIndex: 'remittanceUname'
}, {
  title: '手机号',
  dataIndex: 'remittanceUphone'
}, {
  title: '银行卡号',
  dataIndex: 'remittanceBankAccount'
}, {
  title: '银行流水号',
  dataIndex: 'bankSerialNo'
}, {
  title: '申购金额',
  dataIndex: 'remittanceAmount'
}, {
  title: '申购结果',
  dataIndex: 'remittanceResult'
}]

export default {
  data () {
    return {
      refresh: true,
      data: [],
      filter: {
        declareStartTime: '',
        declareEndTime: '',
        name: '',
        phone: ''
      },
      fileList: [],
      uploading: false,
      importResultModalVisible: false,
      importResults: [],
      pagination: {},
      loading: false,
      columns,
      columnsImportResults
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUploadChange (info) {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('remittanceExcelFile', file)
      })
      this.uploading = true
      importWelfareRemittance(formData).then(({ data }) => {
        this.uploading = false
        this.fetch()
        if (data && data.length > 0) {
          this.importResultModalVisible = true
          this.importResults = data
          return
        }
        this.$message.success('导入成功')
      }).catch(() => {
        this.uploading = false
      })
    },
    handleDateRangeChange (date, dateString) {
      this.filter.declareStartTime = dateString[0]
      this.filter.declareEndTime = dateString[1]
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
      getWelfareRemittanceList(formData).then(({ data }) => {
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
.modal-import-results {
  .ant-modal-body {
    padding: 0;
  }
}
</style>

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
        <label class="filter-col_label">状态：</label>
        <a-select placeholder="请选择实名情况" v-model="filter.status" style="width: 100%;" @change="handleSelectChange">
          <a-select-option value="">全部</a-select-option>
          <a-select-option v-for="(item, index) in statusMap" :value="item.value" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <div class="filter-btn-wrap">
      <a-button type="primary" @click="searchfetch">查询</a-button>
      <a-button @click="reset">重置</a-button>
    </div>

    <a-table
      :rowKey="record => record.uid"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
      <template slot="sex" slot-scope="text, record">
        {{record.sex == '1' ? '男' : record.sex == '2' ? '女' : '未知'}}
      </template>
      <template slot="isRealName" slot-scope="text, record">
        <a-tag :color="record.isRealName == '1' ? 'blue' : 'orange'">{{record.isRealName == '1' ? '是' : '否'}}</a-tag>
      </template>
      <template slot="status" slot-scope="text, record">
        <a-tag :color="record.status == '1' ? 'blue' : 'orange'">{{record.status == '1' ? '启用' : '禁用'}}</a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="handleDetail(record)">查看</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getWelfareUserList } from '@/api/api.welfare'

const columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '性别',
  dataIndex: 'sex',
  scopedSlots: { customRender: 'sex' }
}, {
  title: '手机号',
  dataIndex: 'phone'
}, {
  title: '银行卡号',
  dataIndex: 'bankAccount'
}, {
  title: '总金额（元）',
  dataIndex: 'holdTotalAmount'
}, {
  title: '昨日收益',
  dataIndex: 'yesterdayIncomeAmount'
}, {
  title: '累计收益',
  dataIndex: 'accumulatedIncomeAmount'
}, {
  title: '实名认证',
  dataIndex: 'isRealName',
  scopedSlots: { customRender: 'isRealName' }
}, {
  title: '状态',
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
        name: '',
        phone: '',
        status: ''
      },
      statusMap: [{
        value: 1,
        name: '启用'
      }, {
        value: 2,
        name: '禁用'
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
    handleSelectChange (value) {
      this.filter.status = value
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
      getWelfareUserList(formData).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.pagination.total
        this.loading = false
        this.data = data.list
        this.pagination = pagination
      }).catch(() => {
        this.loading = false
      })
    },
    handleDetail (item) {
      this.$router.push({
        name: 'welfareUserInfo',
        params: {
          uid: item.uid
        }
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

<template lang="pug">
  .out
    table-list(:columnsData="columns" :tabledata="data" :loading="loading" :page="pagination"  @tablechange="fetch")
</template>

<script>
import tableList from './productlistTable'
import * as api from '@/api/api.product'
export default {
  components: {
    tableList
  },
  mounted () {
    this.fetch()
  },
  data () {
    return {
      columns: [{
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 250,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'productName'
        }
      }, {
        title: '所属项目',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 250,
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'projectName'
        }
      }, {
        title: '产品收益（基础+协议)',
        dataIndex: 'sy',
        key: 'sy',
        width: 250,
        scopedSlots: {
          customRender: 'sy'
        }
      }, {
        title: '募集金额',
        dataIndex: 'money',
        key: 'money',
        width: 200,
        scopedSlots: {
          customRender: 'money'
        }
      }, {
        title: '当前募集金额',
        dataIndex: 'alreadyRaiseAmount',
        key: 'alreadyRaiseAmount',
        width: 200,
        scopedSlots: {
          customRender: 'alreadyRaiseAmount'
        }
      }, {
        title: '锁定期限',
        dataIndex: 'lockPeriod',
        key: 'lockPeriod',
        width: 150,
        scopedSlots: {
          customRender: 'lockPeriod'
        }
      }, {
        title: '存续期限',
        dataIndex: 'survivalPeriod',
        key: 'survivalPeriod',
        width: 150,
        scopedSlots: {
          customRender: 'survivalPeriod'
        }
      }, {
        title: '拼团',
        dataIndex: 'isSupportTogether',
        key: 'isSupportTogether',
        width: 150,
        filterMultiple: false,
        filters: [
          { text: '是', value: '1' },
          { text: '否', value: '2' }
        ],
        scopedSlots: {
          customRender: 'isSupportTogether'
        }
      }, {
        title: '定制',
        dataIndex: 'spreadType',
        key: 'spreadType',
        width: 150,
        filterMultiple: false,
        filters: [
          {text: '是', value: '2'},
          {text: '否', value: '1'}
        ],
        scopedSlots: {
          customRender: 'spreadType'
        }
      }, {
        title: '产品状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        filterMultiple: false,
        filters: [
          {text: '待上架', value: '1'},
          {text: '募集中', value: '2'},
          {text: '募集完成', value: '3'},
          {text: '下架', value: '4'}
        ],
        scopedSlots: {
          customRender: 'status'
        }
      }, {
        title: '发布时间',
        dataIndex: 'date',
        key: 'date',
        width: 250,
        scopedSlots: {
          customRender: 'date',
          filterDropdown: 'datechoice'
        }
      }, {
        title: '审核结果',
        dataIndex: 'auditResult',
        key: 'auditResult',
        filterMultiple: false,
        width: 120,
        filters: [
          {text: '审核中 ', value: '1'},
          {text: '审核驳回', value: '2'},
          {text: '通过', value: '3'}
        ],
        scopedSlots: {
          customRender: 'auditResult'
        }
      }, {
        title: '操作',
        scopedSlots: {
          customRender: 'cz'
        },
        key: 'cz',
        fixed: 'right',
        width: 70
      }],
      data: [],
      pagination: null,
      loading: true
    }
  },
  methods: {
    async fetch (params) {
      this.loading = true
      try {
        let res = await api.productSubmitList(params || {})
        this.data = res.data.list
        let pagination = res.data.pagination
        this.pagination = pagination.total <= pagination.pageSize ? false : pagination
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.out{
  padding-top: 20px
}
</style>

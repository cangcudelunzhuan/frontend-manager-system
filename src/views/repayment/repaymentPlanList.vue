<template>
  <div>
    <a-table
      :rowKey="(record, index) => index"
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="loading">
    </a-table>
  </div>
</template>

<script>
import { getRepaymentPlanList } from '@/api/api.repayment'

const columns = [{
  title: '时间',
  dataIndex: 'repaymentTime'
}, {
  title: '待打款总额',
  dataIndex: 'repaymentAmount'
}]

export default {
  data () {
    return {
      data: [],
      loading: false,
      columns
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      getRepaymentPlanList().then(({ data }) => {
        this.loading = false
        this.data = data
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

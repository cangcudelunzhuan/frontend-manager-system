<template lang="pug">
  div
    a-collapse.collapsebox(accordion :bordered="false")
      a-collapse-panel(header="审核记录" key="1")
        a-table(
          :rowKey="record => record.id"
          :columns="columns"
          :dataSource="auditLogVoList"
          :pagination="false"
          :loading="loading")
          template(slot="createTime" slot-scope="text, record")
            span {{text}}
          template(slot="auditResult" slot-scope="text, record")
            a-tag(color="green" v-if="record.auditResult === '1'") 通过
            a-tag(color="red" v-if="record.auditResult === '2'") 不通过
</template>

<script>
export default {
  props: {
    auditLogVoList: {
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      data: [],
      columns: [{
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        scopedSlots: {
          customRender: 'createTime'
        }
      }, {
        title: '提交人',
        dataIndex: 'publishUname',
        key: 'publishUname',
        width: 150
      }, {
        title: '审核人',
        dataIndex: 'auditUname',
        key: 'auditUname',
        width: 150
      }, {
        title: '审核结果',
        dataIndex: 'auditResult',
        key: 'auditResult',
        width: 150,
        scopedSlots: {
          customRender: 'auditResult'
        }
      }, {
        title: '原因',
        dataIndex: 'reason',
        key: 'reason',
        width: 150
      }]
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>

</style>

<template lang="pug">
  div
    .filter-btn-wrap
      a-button(@click="gedetail()" icon="plus-circle" type="primary") 新增团队
    a-table(
    :rowKey="record => record.manageTeamId"
    :columns="columnsData"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="")
      template(slot="manageTeamName" slot-scope="text, record")
        .blue(@click="gedetail(record.manageTeamId, '0')") {{text}}
      template(slot="manageTeamLogoUrl" slot-scope="text, record")
        img.img(:src="record.manageTeamLogoUrl")
      template(slot="cz" slot-scope="text, record")
        .blue(@click="gedetail(record.manageTeamId, '')") 修改
</template>

<script>
import * as api from '@/api/api.team'
export default {
  created () {
    this.fetch()
  },
  data () {
    return {
      loading: false,
      data: [],
      pagination: {},
      columnsData: [{
        title: '团队名称',
        dataIndex: 'manageTeamName',
        key: 'manageTeamName',
        scopedSlots: {
          customRender: 'manageTeamName'
        }
      }, {
        title: '团队logo',
        dataIndex: 'manageTeamLogoUrl',
        key: 'manageTeamLogoUrl',
        scopedSlots: {
          customRender: 'manageTeamLogoUrl'
        }
      }, {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        scopedSlots: {
          customRender: 'cz'
        }
      }]
    }
  },
  methods: {
    gedetail (id, editdisabled) {
      this.$router.push({
        name: 'teamDetail',
        query: {
          id: id,
          editdisabled: editdisabled ? editdisabled.toString() : ''
        }
      })
    },
    async fetch (data) {
      this.loading = true
      let res = await api.teamList(data || {})
      console.log(JSON.stringify(res))
      this.data = res.data.list
      let pagination = res.data.pagination
      this.pagination = pagination.total <= pagination.pageSize ? false : pagination
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.blue {
  color: #1890ff;
  cursor: pointer;
}
.img{
  width: 50px;
  height: 50px
}
.filter-btn-wrap {
  margin-bottom:30px;
  display: flex;
  justify-content: flex-end;
  .ant-btn{
    margin-left: 20px
  }
}
</style>

<template lang="pug">
    .outgroup
      a-table(
          :rowKey="record => record.productId"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="pagination"
          :loading="loadings"
          :locale="{filterConfirm: '确认', filterReset: '重置'}"
          @change="handleTableChange" :scroll="{x: '120%'}" class="table")
          template(slot="action" slot-scope="text, record")
            a-checkbox-group(v-model="checkedList" @change="oncheckChange" :options="[`${record.productId}`]")
          template(slot="productName" slot-scope="text, record")
            .blue(@click="goDetail(record.productId, 0, 'showlist')") {{text}}
          template(slot="projectName" slot-scope="text, record")
            .blue(@click="goprojectDetail(record.projectId)") {{text}}
          template(slot="date" slot-scope="text, record")
            span {{record.createTime}}
          template(slot="money" slot-scope="text, record")
            span {{record.raiseAmount|money}} 元
          template(slot="alreadyRaiseAmount" slot-scope="text, record")
            div(v-if="record.alreadyRaiseAmount>0" )
              span(style="color:#999") {{record.alreadyRaiseAmount|money}} 元
              div(style="margin-top:10px;width:80px")
                a-progress(:percent="(record.alreadyRaiseAmount/record.raiseAmount)*100|count" size="small" status="active" strokeColor="#52c41a")
            div(v-else) --
          template(slot="sy" slot-scope="text, record")
            span {{record.baseRate}}% + {{record.protocolRate}}%
          template(slot="lockPeriod" slot-scope="text, record")
            span {{text}} 天
          template(slot="survivalPeriod" slot-scope="text, record")
            span {{text}} 天
          template(slot="isSupportTogether" slot-scope="text, record")
            span(v-if="record.together") {{record.together}}%
            span(v-else) 否
          template(slot="spreadType" slot-scope="text, record")
            span(v-if="text === '1'") 否
            span(v-if="text === '2'") 是
          template(slot="status" slot-scope="text, record")
            a-tag(color="#2db7f5" v-if="text === '1'") 待上架
            a-tag(color="#108ee9" v-if="text === '2'") 募集中
            a-tag(color="#87d068" v-if="text === '3'") 募集完成
            a-tag(color="#f50" v-if="text === '4'") 下架
          template(slot="auditResult" slot-scope="text, record")
            a-tag(color="orange" v-if="text === '1'") 审核中
            a-tag(color="red" v-if="text === '2'") 审核驳回
            a-tag(color="green" v-if="text === '3'") 通过
          .datebox(slot="datechoice")
            a-range-picker(
              :disabledDate="disabledDate"
              :placeholder="['开始时间', '结束时间']"
              format="YYYY-MM-DD HH:mm:ss"
              @change="ondateChange"
              :v-model="date"
            )
          template(slot="cz" slot-scope="text, record")
            .blue(@click="goDetail(record.productId, '', 'showlist')" v-if="record.auditResult==='1' || record.auditResult==='2'") 修改
          template(slot="sh" slot-scope="text, record")
            .blue(@click="goDetail(record.productId, '0', 'showlist', 'examine')" v-if="record.auditResult==='1'") 审核
          .custom-filter-dropdown(slot="filterDropdown" slot-scope="{setSelectedKeys, selectedKeys, confirm, clearFilters, column}")
            a-input(
              v-ant-ref="c => searchInput = c"
              :placeholder="`搜索 ${column.title}`"
              :value="selectedKeys[0]"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm)"
              style="width: 188px; margin-bottom: 8px; display: block;")
            a-button(
              type='primary'
              @click="() => handleSearch(selectedKeys, confirm)"
              icon="search"
              size="small"
              style="width: 90px; margin-right: 8px") 确定
            a-button(
              @click="handleReset(clearFilters)"
              size="small"
              style="width: 90px") 取消
          a-icon(slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" )
      .toolbox(v-if="showTool")
        .toolin
          span 已选中1项
          span
            a-popconfirm(:title="productStatustext" @confirm="confirm" @cancel="cancel" okText="确定" cancelText="取消")
              .blue(v-if="productStatus === '4'||productStatus === '1'") 上架
                a-icon(type="arrow-up")
              .blue(v-else) 下架
                a-icon(type="arrow-down")
          span.blue(@click="openModal" v-if="ewmstatus") 查看二维码
            a-icon(type="eye")
          a-icon.close(type="close" @click="closetool")
      a-modal(
        title="产品二维码"
        v-model="modalVisible"
        centered=true
        :footer="null")
        .imgbox
          img(:src="qrimg" class="qrimg")
          img(class="qrlogo" src="static/img/dayuologo.png" ref="logos")
</template>

<script>
import moment from 'moment'
import QRCode from 'qrcode'
import * as api from '@/api/api.product'
export default {
  props: [
    'columnsData',
    'tabledata',
    'loading',
    'page'
  ],
  computed: {
    pagination () {
      return this.page
    },
    dataSource () {
      return this.tabledata
    },
    columns () {
      return this.columnsData
    },
    loadings () {
      return this.loading
    }
  },
  data () {
    return {
      refresh: true,
      checkedList: [],
      showTool: false,
      modalVisible: false,
      qrimg: '',
      searchText: '',
      searchInput: null,
      date: '',
      filter: {},
      productStatus: '1',
      productStatustext: '',
      ewmstatus: true
    }
  },
  mounted () {
  },
  methods: {
    oncheckChange (selectedRowKeys) {
      let vm = this
      this.checkedList = []
      this.checkedList.push(selectedRowKeys[selectedRowKeys.length - 1])
      if (this.checkedList[0] !== undefined) {
        console.log('>>' + this.checkedList[0])
        let id = this.checkedList[0]
        let data = this.dataSource
        data.map((item, i) => {
          if (item.productId === id) {
            vm.productStatus = item.status
            vm.productStatustext = (vm.productStatus === '1' || vm.productStatus === '4') ? '确定上架吗？' : '确定下架吗？'
            vm.ewmstatus = item.spreadType === '2'
          }
        })
        this.showTool = true
        return
      }
      this.showTool = false
    },
    async updown (type) {
      let params = {
        id: this.checkedList[0]
      }
      if (type === '2' || type === '3') {
        await api.productDown(params)
      } else if (type === '1' || type === '4') {
        await api.productUp(params)
      }
      this.$message.success('操作成功')
      this.$emit('tablechange', this.filter)
      this.checkedList = []
      this.showTool = false
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
    },
    handleReset (clearFilters) {
      clearFilters()
    },
    handleTableChange (pagination, filters, sorter) {
      let filtersdata = this.deepCopy(filters)
      for (let key in filtersdata) {
        if (Array.isArray(filtersdata[key])) {
          filtersdata[key] = filtersdata[key][0]
        }
      }
      this.filter = {...pagination, ...filtersdata, startTime: this.date[0], endTime: this.date[1]}
      this.$emit('tablechange', this.filter)
    },
    deepCopy (obj) {
      let result = Array.isArray(obj) ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key])
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    },
    reset () {
      for (let key in this.filter) {
        this.filter[key] = ''
      }
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    },
    onChange (key) {
      let id = key.target.value
      this.showTool = true
      console.log(id)
    },
    closetool () {
      this.showTool = false
      this.checkedList = []
    },
    confirm (e) {
      console.log(e)
      console.log('>>>>>' + this.productStatus)
      this.updown(this.productStatus)
    },
    cancel (e) {
      console.log(e)
      this.$message.error('已取消')
    },
    openModal () {
      this.modalVisible = true
      /* eslint-disable */
      let source = `${PRODDETAIL_URL}${this.checkedList[0]}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      /* eslint-enable */
      QRCode.toDataURL(source)
        .then(url => {
          this.qrimg = url
        })
        .catch(err => {
          console.error(err)
        })
    },
    goDetail (id, editdisabled, iflist, examine) {
      this.$router.push({
        name: 'productAdd',
        query: {
          editdisabled: editdisabled.toString(),
          proId: id,
          iflist: iflist,
          examine: examine
        }
      })
    },
    goprojectDetail (id) {
      this.$router.push({
        name: 'projectInfo',
        params: {
          projectId: id
        }
      })
    },
    moment,
    ondateChange (dates, dateStrings) {
      this.date = dateStrings
      let date = {
        startTime: this.date[0],
        endTime: this.date[1]
      }
      this.$set(this.filter, 'current', '1')
      this.filter = {...this.filter, ...date}
      this.$emit('tablechange', this.filter)
    },
    ondateOk (value) {
    },
    disabledDate (current) {
      return current > moment().endOf('day')
    }
  }
}
</script>
<style lang="less" scoped>
.filter-col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding-right: 20px;
  &_label{
    width: 100px
  }
}
.filter-btn-wrap {
  margin-bottom:30px;
  display: flex;
  justify-content: flex-end;
  .ant-btn{
    margin-left: 20px
  }
}
.outgroup{
  width: 100%;
  margin-top: -16px;
  position: relative;
  .toolbox{
    position: absolute;
    width: 100%;
    left: 0;
    top: -55px;
    .toolin {
      background: #fff;
      padding: 16px;
      width: 100%;
      display: flex;
      align-items: center;
      span + span{
        margin-left: 15px
      }
    }
    .close {
      position: absolute;
      right: 5px;
      top: 20px;
      color: #999;
      cursor: pointer
    }
  }
}
.imgbox {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  .qrimg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto
  }
  .qrlogo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 70px;
    height: 70px;
    margin: auto;
    z-index: 9;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #fff
  }
}
.blue {
  color: #1890ff;
  cursor: pointer;
}
</style>

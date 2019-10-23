<template lang="pug">
  div
    a-spin(:spinning="spinning")
      examine-list(class="examine-list" v-if="iflist" :auditLogVoList="auditLogVoList")
      a-form(:form="form")
          input(type="hidden" v-model="edit")
          input(type="hidden" v-model="proId")
          input(type="hidden" v-model="iflist")
          input(type="hidden" v-model="examine")
          a-row
            a-col( :span="12")
              a-form-item(label="产品名称" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['name',{rules: [{ required: true, message: '必填!'}]}]" :disabled="edit" :maxLength="20")
              a-form-item(label="产品简称" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['shortName', {rules: [{ required: true, message: '必填!'}]}]" :disabled="edit" :maxLength="20")
              a-form-item(label="所属项目" :label-col="labelcol" :wrapper-col="wrappercol")
                a-select(v-decorator="['projectName', {rules: [{ required: true, message: '请选择!' }]}]" :disabled="edit"
                  placeholder="请选择项目"
                  @change="getProjectId")
                  a-select-option(:value="item.projectId" v-for="(item, i) in productMes.project" :key="i") {{item.name}}
              a-form-item(label="产品类型" :label-col="labelcol" :wrapper-col="wrappercol")
                a-radio-group(v-decorator="['productType',{rules: [{required: true,message: '请选择!'}]}]" :disabled="edit")
                  a-radio(value="1") 普通型
                  a-radio(value="2") 优先型
              a-form-item(label="募集总份数" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['totalShare', {rules: [{ required: true, message: '必填!'}, {validator: check}], validateFirst: true}]" :disabled="edit")
                span.font 份
              a-form-item(label="每份份额单价" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['shareUnitPrice', {rules: [{ required: true, message: '必填!'}]}]"
                :disabled="edit"
                @blur="onBlur"
                )
                span.font 元
              a-form-item(label="锁定期限" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['lockPeriod', {rules: [{ required: true, message: '必填!'}, {validator: check}], validateFirst: true}]" :disabled="edit")
                span.font 天
              a-form-item(label="存续期限" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['survivalPeriod', {rules: [{ required: true, message: '必填!'},{validator: check}], validateFirst: true}]" :disabled="edit")
                span.font 天
              a-form-item(label="基础收益率" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['baseRate', {rules: [{ required: true, message: '必填!'},{validator: rate}], validateFirst: true}]" :disabled="edit")
                span.font %
              a-form-item(label="协议收益率" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['protocolRate', {rules: [{ required: true, message: '必填!'},{validator: ratezero}], validateFirst: true}]" :disabled="edit")
                span.font %
              a-form-item(label="结算周期" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['settlementCycle', {rules: [{ required: true, message: '必填!' }, {validator: check}], validateFirst: true}]" :disabled="edit")
                span.font 天
            a-col( :span="12")
              a-form-item(label="风险评级信息" :label-col="labelcol" :wrapper-col="wrappercol")
                a-select(v-decorator="['techniqueGrade', {rules: [{ required: true, message: '请选择!' }]}]"
                  placeholder="请选择" :disabled="edit"
                  @change="")
                  a-select-option(:value="it" v-for="(it, i) in techniqueGradeOption" :key="i") {{it}}
              a-form-item(label="风险等级" :label-col="labelcol" :wrapper-col="wrappercol")
                a-radio-group(v-decorator="['riskLevel', {rules: [{ required: true, message: '请选择!' }]}]" :disabled="edit")
                  a-radio(value="1") 低风险
                  a-radio(value="2") 较低风险
                  a-radio(value="3") 中风险
                  a-radio(value="4") 较高风险
                  a-radio(value="5") 高风险
              a-form-item(label="产品说明" :label-col="labelcol" :wrapper-col="wrappercol")
                a-textarea(placeholder="产品说明" :rows="4" v-decorator="['productExplain', {rules: [{ required: true, message: '请输入说明!' }]}]" :disabled="edit")
              a-form-item(label="最小购买份额" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['enregisterMinPurchaseShare', {rules: [{ required: true, message: '必填!' }, {validator: check}], validateFirst: true}]" :disabled="edit" @blur="minblur")
                span.font 份
              a-form-item(label="最大购买份额" :label-col="labelcol" :wrapper-col="wrappercol")
                a-input(v-decorator="['enregisterMaxPurchaseShare', {rules: [{ required: true, message: '必填!' },{validator: min}], validateFirst: true}]" :disabled="edit" )
                span.font 份
              a-form-item(label="是否支持自动存续" :label-col="labelcol" :wrapper-col="wrappercol")
                a-radio-group(v-decorator="['isSupportAutoSurvival', {rules: [{ required: true, message: '请选择!' }]}]" :disabled="edit")
                  a-radio(value="1") 是
                  a-radio(value="2") 否
              a-form-item(label="是否定制" :label-col="labelcol" :wrapper-col="wrappercol")
                a-radio-group(v-decorator="['spreadType', {rules: [{ required: true, message: '请选择!' }]}]" @change="" :disabled="edit")
                  a-radio(value="2") 是
                  a-radio(value="1") 否
              a-form-item(label="是否支持拼团" :label-col="labelcol" :wrapper-col="wrappercol")
                a-radio-group(v-decorator="['isSupportTogethe', {rules: [{ required: true, message: '请选择!' }]}]" @change="onChangeIspt" :disabled="edit")
                  a-radio(value="1") 是
                  a-radio(value="2") 否
              template(v-if="ispt")
                a-form-item(label="拼团最大人数" :label-col="labelcol" :wrapper-col="wrappercol" )
                  a-input(v-decorator="['maxTogetheNum', {rules: [{ required: true, message: '必填!'}, {validator: check}], validateFirst: true}]" disabled @blur="getsyrate")
                  span.font 人
                a-form-item(label="拼团叠加基础利率" :label-col="labelcol" :wrapper-col="wrappercol")
                  a-input(v-decorator="['togetheSuperpositionRate', {rules: [{ required: true, message: '必填!'}, {validator: rate}], validateFirst: true}]" disabled @blur="getsyrate" )
                  span.font %
                a-form-item(label="拼团加息收益率" :label-col="labelcol" :wrapper-col="wrappercol" v-if="edit")
                  a-input(v-decorator="['togetherRate', {rules: [{ required: true, message: '必填!'}]}]" disabled)
                  span.font %
              a-form-item(:wrapper-col="{ span: 12, offset: 7 }" v-if="!edit")
                template(v-if="!edit && !proId")
                  a-button(type="primary" html-type="submit" @click="create") 发布
                  a-button.resbutton(@click="reset") 重置
                template(v-else)
                  a-button(type="primary" html-type="submit" @click="editcheck") 提交审核
                  a-button.resbutton(@click="reset") 重置
              a-form-item(:wrapper-col="{ span: 12, offset: 7 }" v-if="examine")
                    a-button(type="primary" html-type="submit" @click="pass") 通过
                    a-button.resbutton(@click="notpass") 不通过
    a-modal(
      title="审核结果：不通过"
      v-model="notpassModel"
      @ok="subnopass"
      :confirmLoading="confirmLoading"
      okText="确定"
      cancelText="取消"
      centered=true)
      a-form(:form="nopassform")
        a-form-item(label="原因" :label-col="{span:3}" :wrapper-col="{span:21}")
          a-textarea(placeholder="不通过原因" :rows="4" v-decorator="['reason', {rules: [{ required: true, message: '请输入原因!' }]}]")
</template>

<script>
import examineList from './examine-list'
import * as api from '@/api/api.product'
export default {
  components: {
    examineList
  },
  data () {
    return {
      form: this.$form.createForm(this),
      productMes: {},
      ProjectId: '',
      techniqueGradeOption: [
        'AAA', 'AA+', 'AA', 'A+', 'A', 'A-', 'BBB', 'BB+', 'BB', 'B+', 'B', 'B-'
      ],
      auditLogVoList: [],
      labelcol: {
        span: 7
      },
      wrappercol: {
        span: 12
      },
      ispt: true,
      notpassModel: false,
      nopassform: this.$form.createForm(this),
      confirmLoading: false,
      spinning: false
    }
  },
  created () {
    let vm = this
    vm.getprojectList()
    if (vm.proId) {
      this.$nextTick(() => {
        vm.fetch(vm.proId)
      })
    } else {
      this.ispt = false
    }
  },
  computed: {
    edit () {
      return this.$route.query.editdisabled === '0'
    },
    proId () {
      return this.$route.query.proId
    },
    iflist () {
      return this.$route.query.iflist
    },
    examine () {
      return this.$route.query.examine
    }
  },
  watch: {
    ispt (val) {
      let vm = this
      if (val === true) {
        // 拼团加息定死逻辑
        setTimeout(() => {
          vm.form.setFieldsValue({
            maxTogetheNum: 5,
            togetheSuperpositionRate: 0.5
          })
        }, 100)
      }
    }
  },
  methods: {
    async getprojectList () {
      let res = await api.projectAllList()
      console.log('>>res' + JSON.stringify(res))
      this.$set(this.productMes, 'project', res.data)
    },
    async fetch (productId) {
      this.spinning = true
      let result = await api.productDetail({productId: productId})
      let data = result.data
      this.ispt = data.isSupportTogethe === '1'
      data.shareUnitPrice = this.moneyformat(data.shareUnitPrice)
      this.$set(this.productMes, 'productId', data.productId)
      this.ProjectId = data.projectId
      this.auditLogVoList = data.auditLogVoList || []
      this.auditLogVoList.map((item, i) => {
        item.id = i
      })
      delete data.productId
      delete data.projectId
      delete data.auditLogVoList
      this.form.setFieldsValue(data)
      this.spinning = false
    },
    pass (e) {
      let vm = this
      this.$confirm({
        title: '提示',
        content: '确认通过审核吗',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          let data = {
            status: '5',
            productId: vm.productMes.productId
          }
          vm.passAndNot(data)
        }
      })
    },
    notpass () {
      this.notpassModel = true
    },
    subnopass (e) {
      e.preventDefault()
      this.nopassform.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          let data = {
            status: '6',
            productId: this.productMes.productId,
            reason: values.reason
          }
          this.passAndNot(data)
        }
      })
    },
    async passAndNot (data) {
      await api.productOpe(data)
      this.$message.success('操作成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    },
    // 修改
    editcheck (e) {
      let vm = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          vm.$confirm({
            title: '提示',
            content: '确认提交修改吗',
            okText: '确认',
            cancelText: '取消',
            onOk () {
              vm.toproductUpdate(vm.form.getFieldsValue())
            }
          })
        }
      })
    },
    // 发布
    create (e) {
      let vm = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          vm.$confirm({
            title: '提示',
            content: '确认发布吗',
            okText: '确认',
            cancelText: '取消',
            onOk () {
              vm.updateAndCreat(vm.form.getFieldsValue(), 'productCreate')
            }
          })
        }
      })
    },
    toproductUpdate (formdata) {
      let data = formdata
      data.productId = this.productMes.productId
      this.updateAndCreat(data, 'productUpdate')
    },
    async updateAndCreat (formdata, func) {
      let data = formdata
      data.projectId = this.ProjectId
      data.shareUnitPrice = data.shareUnitPrice.replace(/[ ]/g, '').replace(/,/gi, '')
      await api[func](data)
      this.$message.success('发布成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    },
    onChangeIspt (e) {
      this.ispt = e.target.value === '1'
    },
    reset () {
      this.form.resetFields()
      this.ispt = false
    },
    getProjectId (value) {
      this.ProjectId = value
    },
    onBlur (e) {
      let v = e.target.value.replace(/[ ]/g, '').replace(/,/gi, '')
      if (!(/(^[1-9]\d*$)/.test(v))) {
        console.log('>>')
        this.form.setFieldsValue({
          shareUnitPrice: ''
        })
        return
      }
      let value = this.moneyformat(v)
      this.form.setFieldsValue({
        shareUnitPrice: value
      })
    },
    moneyformat (num) {
      let res = num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ','
        })
      })
      return res
    },
    getsyrate () {
      let num = parseFloat(this.form.getFieldValue('maxTogetheNum'))
      let rate = parseFloat(this.form.getFieldValue('togetheSuperpositionRate'))
      let reg = /^([1-9]\d?(\.\d{1,1})?|0\.\d{1,1}|99.9)$/
      if (!num || !rate || !(reg.test(rate))) {
        return
      }
      this.form.setFieldsValue({
        togetherRate: this.pointFormat((num - 1) * rate)
      })
    },
    pointFormat (f, digit) {
      if (f === 'NaN') return '--'
      let d = digit || 2
      let m = Math.pow(10, d)
      return Math.round(f * m, 10) / m
    },
    minblur () {
      let max = this.form.getFieldValue('enregisterMaxPurchaseShare')
      if (max) {
        this.form.setFieldsValue({
          enregisterMaxPurchaseShare: ''
        })
      }
    },
    /* eslint-disable */
    checkPrice (rule, value, callback) {
      if ((/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(value))) {
        callback()
        return
      }
      callback('金额格式不正确!')
    },
    check (rule, value, callback) {
      if ((/(^[1-9]\d*$)/.test(value))) {
        callback()
        return
      }
      callback('输入正整数!')
    },
    rate (rule, value, callback) {
      let reg = /^([1-9]\d?(\.\d{1,1})?|0\.\d{1,1}|99.9)$/
      if (reg.test(value)) {
        callback()
        return
      }
      callback('请输入0-100之间的数字,最长1位小数!')
    },
    ratezero(rule, value, callback) {
      let reg = /^100$|^(\d|[1-9]\d)(\.\d{1,1}|99.9)*$/
      if (reg.test(value)) {
        callback()
        return
      }
      callback('请输入0-100之间(含0)的数字,最长1位小数!')
    },
    min (rule, value, callback) {
      if ((/(^[1-9]\d*$)/.test(value))) {
        let max = this.form.getFieldValue('enregisterMaxPurchaseShare')
        let min = this.form.getFieldValue('enregisterMinPurchaseShare')
        console.log('>>' + min)
        if (max === undefined || min === undefined || min === '' || parseInt(min) <= parseInt(max)) {
          callback()
          return
        }
        callback('最小购买份额不能大于最大！')
      }
      callback('输入正整数!')
    }
    /* eslint-enable */
  }
}
</script>

<style lang="less" scoped>
.examine-list {
  margin-bottom: 20px
}
.ant-form-item-children {
  position: relative;
  .font {
    position: absolute;
    right: -25px;
    top: -12px
  }
}
.resbutton {
  margin-left:  8px
}
</style>

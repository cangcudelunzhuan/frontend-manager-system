<template>
  <div>
    <a-collapse class="review-history" v-if="projectId">
      <a-collapse-panel header="审核记录">
        <a-table
          :rowKey="record => record.auditId"
          :columns="columns"
          :dataSource="projectDetail.auditLogVoList"
          :pagination="false">
          <template slot="auditResult" slot-scope="text, record">
            <a-tag :color="record.auditResult === '1' ? 'blue' : 'orange'">{{record.auditResult === '1' ? '通过' : '不通过'}}</a-tag>
          </template>
        </a-table>
      </a-collapse-panel>
    </a-collapse>

    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="项目名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['name', {rules: [{ required: true, message: '必填!'}]}]" :maxLength="14"/>
      </a-form-item>

      <a-form-item label="项目所在地" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['location', {rules: [{ required: true, message: '必填!'}]}]"/>
      </a-form-item>

      <a-form-item label="募集金额" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['raiseAmount', {rules: [{ required: true, message: '必填!'}]}]" @blur="onBlur"/>
        <span class="font"> 元</span>
      </a-form-item>

      <a-form-item label="管理团队" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-select v-decorator="['manageTeamId', {rules: [{ required: true, message: '必填!'}]}]">
          <a-select-option v-for="(item, index) in manageTeamList" :value="item.manageTeamId" :key="index">{{item.manageTeamName}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="项目介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-textarea v-decorator="['projectIntroduce', {rules: [{ required: true, message: '必填!'}]}]"/>
      </a-form-item>

      <a-form-item label="担保介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-textarea v-decorator="['guaranteeIntroduce', {rules: [{ required: true, message: '必填!'}]}]"/>
      </a-form-item>

      <a-form-item label="标的介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-textarea v-decorator="['subjectIntroduce', {rules: [{ required: true, message: '必填!'}]}]"/>
      </a-form-item>
      <a-row>
        <a-col :span="6" class="mediabox">
          <span class="mediabox-title">相关媒体: </span>
        </a-col>
        <a-col :span="12" >
          <div class="media-item" v-for="(item, index) in form.getFieldValue('media')" :key="index">
            <div class="first-item">
              <a-form-item
                label=""
                :required="false"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12}">
                    <a-input
                      v-decorator="[
                      `media-title-${index}`,
                        {
                          rules: [{
                            required: true,
                            whitespace: true,
                            message: '请输入标题',
                          }],
                        }
                      ]"
                      placeholder="标题"/>
              </a-form-item>
            </div>
            <div class="second-item">
              <a-form-item
                :required="false"
                :wrapper-col="{span: 12,offset: 0}">
                    <a-input
                      v-decorator="[
                        `media-url-${index}`,
                        {
                          rules: [{
                            required: true,
                            whitespace: true,
                            message: '请输入链接',
                          }],
                        }
                      ]"
                      placeholder="链接"/>
              </a-form-item>
              <a-icon
                class="dynamic-delete-button"
                type="minus-circle-o"
                style="cursor:pointer"
                @click="() => remove(item)"/>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-form-item
        label=""
        :required="false"
        :wrapper-col="{ span: 12, offset: 6 }">
        <a-button
          type="dashed"
          @click="add">
          <a-icon type="plus" />
        </a-button>
      </a-form-item>
      <a-form-item label="首页项目banner图" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-upload
          name="file"
          :fileList="fileList"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
          @change="handleUploadChange"
          v-decorator="['bannerImgUrl', {rules: [{ required: true, message: 'banner必须上传！'}]}]">
          <a-button :disabled="uploading">
            <a-icon type="upload"/>
          </a-button>
        </a-upload>
        <div v-if="bannerImgUrl">
          <img class="banner-img" :src="bannerImgUrl" alt="">
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit" :loading="submitLoading"> 提交审核</a-button>
        <a-button style="margin-left: 12px" @click="$router.go(-1)"> 取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getProjectDetail, getProjectTeamListAll, projectBannerUpload, projectCreate, projectUpdate } from '@/api/api.project'

export default {
  data () {
    return {
      projectId: this.$route.params.projectId || '',
      columns: [{
        title: '时间',
        dataIndex: 'createTime'
      }, {
        title: '提交人',
        dataIndex: 'publishUname'
      }, {
        title: '审核人',
        dataIndex: 'auditUname'
      }, {
        title: '审核结果',
        dataIndex: 'auditResult',
        scopedSlots: { customRender: 'auditResult' }
      }, {
        title: '原因',
        dataIndex: 'reason'
      }],
      projectDetail: {},
      manageTeamList: [],
      fileList: [],
      uploading: false,
      submitLoading: false,
      bannerImgUrl: '',
      file: null
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('media', { initialValue: [], preserve: true })
  },
  created () {
    this.projectId && this.fetchProjectDetail(this.projectId)
    this.fetchManageTeamList()
  },
  methods: {
    fetchProjectDetail (projectId) {
      getProjectDetail(projectId).then(({ data }) => {
        this.projectDetail = data
        this.setFormField()
      })
    },
    fetchManageTeamList () {
      getProjectTeamListAll().then(({ data }) => {
        this.manageTeamList = data
      })
    },
    setFormField () {
      const data = Object.assign({}, this.projectDetail)
      const mediaTitle = data.relatedMediaInfo.split('|')
      const mediaUrl = data.relatedMediaUrl.split('|')
      data.raiseAmount = this.moneyformat(data.raiseAmount)
      data.media = []
      delete data.projectId
      delete data.auditLogVoList
      delete data.manageTeamIntroduce
      delete data.manageTeamLogoUrl
      delete data.manageTeamName
      delete data.relatedMediaInfo
      delete data.relatedMediaUrl
      for (let i = 0; i < mediaTitle.length; i++) {
        data.media.push({
          title: mediaTitle[i],
          url: mediaUrl[i]
        })
      }
      this.form.setFieldsValue(data)
      this.bannerImgUrl = data.bannerImgUrl
      this.$nextTick(() => {
        let newData = {}
        for (let i = 0; i < mediaTitle.length; i++) {
          newData['media-title-' + i] = mediaTitle[i]
          newData['media-url-' + i] = mediaUrl[i]
        }
        this.form.setFieldsValue(newData)
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
    onBlur (e) {
      let v = e.target.value.replace(/[ ]/g, '').replace(/,/gi, '')
      if (!(/(^[1-9]\d*$)/.test(v))) {
        this.form.setFieldsValue({
          raiseAmount: ''
        })
        return
      }
      if (v.length >= 15) {
        v = v.substr(0, 15)
      }
      let value = this.moneyformat(v)
      this.form.setFieldsValue({
        raiseAmount: value
      })
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      this.file = file
      return false
    },
    handleUploadChange (info) {
      let vm = this
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', vm.file)
      })
      this.uploading = true
      projectBannerUpload(formData).then(({ data }) => {
        this.bannerImgUrl = data
        console.log('>>' + JSON.stringify(data))
        this.uploading = false
      }).catch(() => {
        this.uploading = false
      })
    },
    remove (item) {
      const { form } = this
      const media = form.getFieldValue('media')
      form.setFieldsValue({
        media: media.filter(elem => elem !== item)
      })
    },
    add () {
      const { form } = this
      const media = form.getFieldValue('media')
      const newMedia = media.concat({ title: '', url: '' })
      form.setFieldsValue({ media: newMedia })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = Object.assign({ relatedMediaInfo: '', relatedMediaUrl: '' }, values)
          formData.bannerImgUrl = this.bannerImgUrl
          for (let i = 0; i < formData.media.length; i++) {
            formData.relatedMediaInfo += formData['media-title-' + i] + (i < formData.media.length - 1 ? '|' : '')
            formData.relatedMediaUrl += formData['media-url-' + i] + (i < formData.media.length - 1 ? '|' : '')
            delete formData['media-title-' + i]
            delete formData['media-url-' + i]
          }
          delete formData.media
          formData.raiseAmount = formData.raiseAmount.replace(/[ ]/g, '').replace(/,/gi, '')
          this.submitLoading = true
          if (!this.projectId) {
            projectCreate(formData).then(() => {
              this.$message.success('项目新建成功！')
              this.submitLoading = false
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            }).catch(() => {
              this.submitLoading = false
            })
          } else {
            projectUpdate(Object.assign({ projectId: this.projectId }, formData)).then(() => {
              this.$message.success('项目修改成功！')
              this.submitLoading = false
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            }).catch(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    /* eslint-disable */
    check (rule, value, callback) {
      if ((/(^[1-9]\d*$)/.test(value))) {
        callback()
        return
      }
      callback('输入正整数!')
    }
    /* eslint-enable */
  }
}
</script>

<style lang="less" scoped>
.ant-form-item-children {
  position: relative;
  .font {
    position: absolute;
    right: -25px;
    top: -12px
  }
}
.form-item-media {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.review-history {
  margin-bottom: 30px;
}
.banner-img {
  max-width: 400px;
  max-height: 300px;
}
.mediabox{
  position:  relative;
  .mediabox-title{
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgba(0, 0, 0, 0.85)
  }
}
.media-item{
  position: relative;
  .first-item{
    position: relative;
    z-index: 1
  }
  .second-item{
    position: relative;
    top: -10px;
    z-index: 2;
    .dynamic-delete-button{
      position: absolute;
      left: 52%;
      top: -10px
    }
  }
}
</style>

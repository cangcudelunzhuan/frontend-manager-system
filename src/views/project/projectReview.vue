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

    <a-form>
      <a-form-item label="项目名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.name}}
      </a-form-item>

      <a-form-item label="项目所在地" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.location}}
      </a-form-item>

      <a-form-item label="募集金额" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.raiseAmount}}
        <span class="font"> 元</span>
      </a-form-item>

      <a-form-item label="管理团队" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.manageTeamName}}
      </a-form-item>

      <a-form-item label="管理团队LOGO" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <img :src="projectDetail.manageTeamLogoUrl" alt="LOGO">
      </a-form-item>

      <a-form-item label="管理团队介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.manageTeamIntroduce}}
      </a-form-item>

      <a-form-item label="项目介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.projectIntroduce}}
      </a-form-item>

      <a-form-item label="担保介绍" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        {{projectDetail.guaranteeIntroduce}}
      </a-form-item>

      <a-form-item
        label="相关媒体"
        :required="false"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12}">
        <div v-for="(item, index) in media" :key="index">
          <p>{{item.title}}</p>
          <p>
            <a :href="item.url">{{item.url}}</a>
          </p>
        </div>
      </a-form-item>

      <a-form-item label="首页项目banner图" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <img class="banner-img" :src="projectDetail.bannerImgUrl" alt="Banner">
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" @click="reviewModal('4')">通过</a-button>
        <a-button style="margin-left: 12px" @click="reviewModal('3')"> 不通过</a-button>
      </a-form-item>
    </a-form>

    <a-modal v-model="modalVisible" :footer="null">
      <a-form :form="form" @submit="handleReview">
        <a-form-item label="审核结果" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          {{statusMap[status]}}
        </a-form-item>
         <a-form-item label="原因" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-textarea v-decorator="['reason', { validateTrigger: ['blur'], rules: [{ required: true, message: '必填!'}]}]"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit" :loading="submitLoading">确认</a-button>
          <a-button style="margin-left: 12px" @click="modalVisible = false"> 取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getProjectDetail, projectOpe } from '@/api/api.project'

export default {
  data () {
    return {
      projectId: this.$route.params.projectId,
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
      media: [],
      modalVisible: false,
      submitLoading: false,
      statusMap: { '3': '不通过', '4': '通过' },
      status: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  created () {
    this.fetchProjectDetail(this.projectId)
  },
  methods: {
    fetchProjectDetail (projectId) {
      getProjectDetail(projectId).then(({ data }) => {
        let mediaTitle = data.relatedMediaInfo.split('|')
        let mediaUrl = data.relatedMediaUrl.split('|')
        this.projectDetail = data
        for (let i = 0; i < mediaTitle.length; i++) {
          this.media.push({
            title: mediaTitle[i],
            url: mediaUrl[i]
          })
        }
      })
    },
    reviewModal (status) {
      this.status = status
      this.modalVisible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ reason: '' })
      })
    },
    handleReview (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true
          projectOpe({
            projectId: this.projectId,
            status: this.status,
            reason: this.form.getFieldValue('reason')
          }).then(() => {
            this.$message.success('操作成功！')
            this.submitLoading = false
            this.modalVisible = false
            this.$router.push({ name: 'projectReviewList' })
          }).catch(() => {
            this.submitLoading = false
          })
        }
      })
    }
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
.banner-img {
  max-width: 400px;
  max-height: 300px;
}
</style>

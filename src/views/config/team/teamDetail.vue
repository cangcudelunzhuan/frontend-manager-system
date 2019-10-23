<template lang="pug">
  .mesbox
    a-spin(:spinning="spinning")
      a-form(:form="form")
        input(type="hidden" v-model="edit")
        input(type="hidden" v-model="id")
        a-row
          a-col( :span="24")
            a-form-item(label="团队名称" :label-col="labelcol" :wrapper-col="wrappercol")
              a-input(v-decorator="['manageTeamName',{rules: [{ required: true, message: '必填!'}]}]" :disabled="edit" :maxLength="7")
            a-form-item(label="团队logo" :label-col="labelcol" :wrapper-col="wrappercol")
              a-upload(:disabled="edit" v-decorator="['manageTeamLogoUrl',{rules: [{ required: true, message: '请上传!'}]}]"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="upimg")
                a-spin(:spinning="imgspinning")
                  .haslogo(v-if="imageUrl" )
                    img(:src="imageUrl" alt="avatar" class="logobox")
                    a-icon(type="minus-circle" class="deletes" @click="deleteimg" v-if="!edit")
                  template(v-else)
                      a-icon(:type="loading ? 'loading' : 'plus'")
                      div(class="ant-upload-text") 上传图片
            a-form-item(label="团队介绍" :label-col="labelcol" :wrapper-col="wrappercol")
              a-textarea(placeholder="团队介绍" :rows="4" v-decorator="['manageTeamIntroduce', {rules: [{ required: true, message: '请输入团队介绍!' }]}]" :disabled="edit" :maxLength="800")
            a-form-item(:wrapper-col="{ span: 12, offset: 4 }" v-if="!edit")
                  template(v-if="!edit && !id")
                    a-button(type="primary" html-type="submit" @click="create") 新增
                    a-button.resbutton(@click="reset") 重置
                  template(v-else)
                    a-button(type="primary" html-type="submit" @click="editcheck") 修改
                    a-button.resbutton(@click="reset") 重置
</template>

<script>
import * as api from '@/api/api.team'
export default {
  data () {
    return {
      spinning: false,
      form: this.$form.createForm(this),
      labelcol: {
        span: 4
      },
      wrappercol: {
        span: 12
      },
      imageUrl: null,
      loading: false,
      file: null,
      imgspinning: false,
      manageTeamId: null
    }
  },
  computed: {
    edit () {
      return this.$route.query.editdisabled === '0'
    },
    id () {
      return this.$route.query.id
    }
  },
  mounted () {
    if (this.id) {
      this.getdetail(this.id)
    }
  },
  methods: {
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
              vm.updateAndCreat(vm.form.getFieldsValue(), 'teamCreate')
            }
          })
        }
      })
    },
    editcheck (e) {
      let vm = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          vm.$confirm({
            title: '提示',
            content: '确认修改吗',
            okText: '确认',
            cancelText: '取消',
            onOk () {
              vm.updateAndCreat(vm.form.getFieldsValue(), 'teamUpdate')
            }
          })
        }
      })
    },
    async updateAndCreat (formdata, func) {
      this.spinning = true
      let data = formdata
      if (this.manageTeamId) {
        data.manageTeamId = this.manageTeamId
      }
      await api[func](data)
      this.spinning = false
      this.$message.success('操作成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    },
    reset () {
      this.form.resetFields()
      this.form.setFieldsValue({
        manageTeamLogoUrl: ''
      })
      this.imageUrl = ''
    },
    beforeUpload (file) {
      const isjpg = file.type === 'image/jpeg'
      const ispng = file.type === 'image/png'
      const img = !isjpg && !ispng
      if (img) {
        this.$message.error('请上传JPG或png格式!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片必须小于2MB!')
      }
      this.file = file
      return !img && isLt2M
    },
    async upimg (info) {
      this.imgspinning = true
      const formData = new FormData()
      let vm = this
      formData.append('file', vm.file)
      let res = await api.teamlogoUp(formData)
      this.form.setFieldsValue({
        manageTeamLogoUrl: res.data
      })
      this.imageUrl = res.data
      this.imgspinning = false
    },
    deleteimg () {
      this.imageUrl = ''
      this.form.setFieldsValue({
        manageTeamLogoUrl: ''
      })
    },
    async getdetail (id) {
      this.spinning = true
      let params = {
        id: id
      }
      let res = await api.teamDetail(params)
      let data = res.data
      this.manageTeamId = data.manageTeamId
      this.form.setFieldsValue({
        manageTeamName: data.manageTeamName,
        manageTeamLogoUrl: data.manageTeamLogoUrl,
        manageTeamIntroduce: data.manageTeamIntroduce
      })
      this.imageUrl = data.manageTeamLogoUrl
      this.spinning = false
      console.log('>>>' + JSON.stringify(res))
    }
  }
}
</script>

<style lang="less" scoped>
.mesbox{
  padding-top: 20px
}
.resbutton {
  margin-left:  8px
}
.avatar-uploader > .ant-upload{
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.haslogo {
  position:  relative;
  .logobox {
    width: 128px;
    height: 128px;
  }
  .deletes{
    position: absolute;
    right: -15px;
    top:-15px;
    z-index: 9;
    font-size: 16px;
    color: #8a8787;
    cursor: pointer;
  }
}
</style>

<template>
  <a-menu theme="dark" mode="inline" :defaultOpenKeys="defaultOpenKeys" :defaultSelectedKeys="defaultSelectedKeys">
    <template v-for="menuSub1 in menuList">
      <a-sub-menu  v-if="menuSub1.children" :key="menuSub1.key">
        <span slot="title">
          <a-icon :type="menuSub1.icon"/>
          <span>{{menuSub1.name}}</span>
        </span>
        <template v-for="menuSub2 in menuSub1.children">
          <a-sub-menu
            v-if="menuSub2.children"
            :key="menuSub2.key"
            :title="menuSub2.name">
            <a-menu-item
              v-for="menuSub3 in menuSub2.children"
              :key="menuSub3.key"
              @click="handleMenuClick(menuSub3)">
              {{menuSub3.name}}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item
            v-else
            :key="menuSub2.key"
            @click="handleMenuClick(menuSub2)">
            {{menuSub2.name}}
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item
        v-else
        :key="menuSub1.key"
        @click="handleMenuClick(menuSub1)">
        {{menuSub1.name}}
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
export default {
  name: 'dyMenu',
  data () {
    return {
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
      menuList: [{
        name: '用户管理',
        icon: 'user',
        children: [{
          name: '用户列表',
          router: 'userList'
        }, {
          name: '用户列表-工资宝',
          router: 'welfareUserList'
        }]
      }, {
        name: '申购管理',
        icon: 'shopping-cart',
        children: [{
          name: '开放登记',
          router: 'enregisterList'
        }, {
          name: '申购成功',
          router: 'subscribeSuccessList'
        }, {
          name: '申购登记-工资宝',
          router: 'welfareRemittanceList'
        }]
      }, {
        name: '还款管理',
        icon: 'credit-card',
        children: [{
          name: '赎回列表-工资宝',
          router: 'welfareRedeemList'
        }, {
          name: '资金总览-工资宝',
          router: 'welfareCapitalStockList'
        }, {
          name: '还款计划',
          router: 'repaymentPlanList'
        }, {
          name: '已打款明细',
          router: 'repaymentDetailConfirm'
        }, {
          name: '待打款明细',
          router: 'repaymentDetailUnconfirm'
        }]
      }, {
        name: '项目产品管理',
        icon: 'hourglass',
        children: [{
          name: '产品管理',
          router: 'product',
          children: [{
            name: '产品列表',
            router: 'productList'
          }, {
            name: '我提交的产品',
            router: 'productSubmitList'
          }, {
            name: '我审核的产品',
            router: 'productExamineList'
          }]
        }, {
          name: '项目管理',
          children: [{
            name: '项目列表',
            router: 'projectList'
          }, {
            name: '我提交的项目',
            router: 'projectSubmitList'
          }, {
            name: '我审核的项目',
            router: 'projectReviewList'
          }]
        }]
      }, {
        name: '配置管理',
        icon: 'team',
        children: [{
          name: '团队管理',
          router: 'teamAdmin'
        }]
      }]
    }
  },
  methods: {
    handleMenuClick (item) {
      this.$router.push({ name: item.router })
    },
    walkthrough (list, parentKey) {
      for (let i = 0; i < list.length; i++) {
        this.getDefaultKeys(list[i], parentKey, i)
      }
    },
    getDefaultKeys (menuItem, parentKey, selfIndex) {
      this.$set(menuItem, 'key', parentKey === undefined ? selfIndex + '' : parentKey + '-' + selfIndex)
      if (menuItem.children) {
        this.walkthrough(menuItem.children, menuItem.key)
      } else {
        if (menuItem.router === this.$route.name) {
          let keys = menuItem.key.split('-')
          let openKeysPath = ''
          for (let i = 0; i < keys.length - 1; i++) {
            openKeysPath += (i === 0 ? keys[i] : '-' + keys[i])
            this.defaultOpenKeys.push(openKeysPath)
          }
          this.defaultSelectedKeys = [menuItem.key]
        }
      }
    }
  },
  created () {
    this.walkthrough(this.menuList)
  }
}
</script>

<style lang="less" scoped>

</style>

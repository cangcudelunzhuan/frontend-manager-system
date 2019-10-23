<template>
  <a-layout>
    <a-layout-sider>
      <div class="logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo">
        <h1>大鱼财富</h1>
      </div>
      <dy-menu/>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '220px' }">
      <a-layout-header style="background: #fff; padding: 0">
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import dyMenu from '@/components/dyMenu'
export default {
  components: {
    dyMenu
  }
}
</script>
<style lang="less">
.ant-layout.ant-layout-has-sider {
  min-height: 100vh;
}
.ant-layout-sider {
  max-width: 220px !important;
  min-width: 220px !important;
  width: 220px !important;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  .logo {
    display: flex;
    justify-content:flex-start;
    align-items: center;
    height: 32px;
    margin: 16px;
    img {
      width: 32px;
      margin-right: 10px;
    }
    h1 {
      font-size: 20px;
      color: white;
      margin: 0;
    }
  }
}
</style>

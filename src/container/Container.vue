<template>
  <el-container class="container" :style="{ height: clientHeight }">
    <app-header />
    <el-container>
      <app-aside />
      <app-main />
    </el-container>
    <global-dialog />
  </el-container>
</template>

<script>
import Header from './Header';
import Aside from './Aside';
import Main from './Main';
import GlobalDialog from '../components/GlobalDialog';
export default {
  name: 'Container',
  components: {
    'app-header': Header,
    'app-aside': Aside,
    'app-main': Main,
    'global-dialog': GlobalDialog,
  },
  data() {
    return {
      clientHeight: 0,
    };
  },
  mounted() {
    this.initDom();
  },
  methods: {
    initDom() {
      this.clientHeight = document.documentElement.clientHeight + 'px';
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>

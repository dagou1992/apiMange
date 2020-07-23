<template>
  <el-container class="api_test">
    <test-sider></test-sider>
    <test-container></test-container>
  </el-container>
</template>

<script>
import TestSider from '../../components/ApiTest/TestSider';
import TestContainer from '../../components/ApiTest/TestContainer';
export default {
  name: 'Test',
  data() {
    return {};
  },
  components: { TestContainer, TestSider },
};
</script>

<style lang="scss" scoped>
.api_test {
  height: calc(100vh - 100px);
  border: 1px solid #eee;
}
</style>

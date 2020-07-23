<template>
  <el-container class="api">
    <api-sider />
    <api-table />
  </el-container>
</template>

<script>
import Sider from '../../components/Api/Sider';
import Table from '../../components/Api/Table';
export default {
  name: 'Api',
  components: {
    'api-sider': Sider,
    'api-table': Table,
  },
};
</script>

<style lang="scss" scoped>
.api {
  height: calc(100vh - 100px);
  border: 1px solid #eee;
}
</style>

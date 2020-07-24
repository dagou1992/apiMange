<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%; border: 1px solid #ddd;"
    :header-cell-style="{
      background: '#f8f8f8',
      color: '#333',
      borderLeft: '1px solid #ddd',
    }"
  >
    <el-table-column
      v-for="item in tableList"
      :key="item.label"
      :prop="item.value"
      :label="item.label"
      :width="item.width"
    >
    </el-table-column>
    <table-operation :operations="operations" />
  </el-table>
</template>

<script>
import TableOperation from '../common/TableOperation';
export default {
  name: 'BaseTable',
  props: {
    tableData: Array,
    loading: Boolean,
    tableList: Array,
    operations: Array,
  },
  components: { TableOperation },
};
</script>

<style scoped></style>

<template>
  <el-table-column label="操作" width="250">
    <template slot-scope="scope">
      <template v-for="(o, index) in operations">
        <span :key="o.label" @click="o.onClick(scope.row)">{{ o.label }}</span>
        <el-divider
          v-if="index !== operations.length - 1"
          :key="o.label"
          direction="vertical"
        ></el-divider>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TableOperation',
  props: {
    operations: Array,
  },
};
</script>

<style scoped>
span {
  color: #1890ef;
  cursor: pointer;
}
span:hover {
  text-decoration: underline;
}
</style>

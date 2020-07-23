<template>
  <el-table-column label="操作" width="250">
    <template slot-scope="scope">
      <span @click="handleToEdit(scope.row.id)">编辑</span>
      <el-divider direction="vertical"></el-divider>
      <span @click="handleToOpen(scope.row.id)">新标签打开</span>
      <el-divider direction="vertical"></el-divider>
      <span @click="handleToDelete(scope.row.id, scope.row.group)">删除</span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TableOperation',
  methods: {
    handleToDelete(id, group) {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        message: `<span style="color: red;">确定要删除吗？</span>`,
        visible: true,
        onSubmit: () => this.$emit('on-to-delete-data', { id, group }),
      });
    },
    handleToEdit(id) {
      this.$router.push({ name: 'ApiEditPage', query: { id } });
    },
    handleToOpen(id) {
      window.open(`#/api/detail?id=${id}`);
    },
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

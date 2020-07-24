<template>
  <el-dialog title="新建环境" :visible="dialogVisible" width="30%">
    <el-form :model="formData" label-width="80px">
      <el-form-item
        v-for="item in formList"
        :label="item.label"
        :key="item.label"
      >
        <el-input v-model="formData[item.value]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">
          立即创建
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateDialog',
  props: {
    formData: Object,
    formList: Array,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleChangeDialogVisible(value) {
      console.log(value);
      this.dialogVisible = value;
    },
    handleCreate() {
      this.$emit('create');
    },
  },
};
</script>

<style scoped></style>

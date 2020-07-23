<template>
  <el-dialog
    :title="globalDialogData.title"
    :visible="globalDialogData.visible"
    width="30%"
    :before-close="handleClose"
  >
    <div
      v-if="globalDialogData.type === 'message'"
      v-html="globalDialogData.message"
    ></div>
    <el-input
      v-else-if="globalDialogData.type === 'input'"
      v-model="globalDialogData.value"
    ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'GlobalDialog',
  computed: {
    ...mapGetters(['globalDialogData']),
  },
  methods: {
    handleClose() {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        visible: false,
      });
    },
    handleSubmit() {
      this.globalDialogData.onSubmit(this.globalDialogData.value);
    },
  },
};
</script>

<style scoped></style>

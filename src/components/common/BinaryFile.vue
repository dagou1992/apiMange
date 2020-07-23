<template>
  <div style="padding-left: 10px;">
    <el-button
      slot="trigger"
      size="small"
      type="primary"
      @click="handleClickLoad"
      >选取文件</el-button
    >
    <input
      type="file"
      id="files"
      ref="refFile"
      style="display: none;"
      @change="handleFileLoad"
    />
    <span v-if="file" style="margin-left: 10px; font-size: 13px;">{{
      file.name
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'BinaryFile',
  props: {
    data: Array,
  },
  data() {
    return {
      file: undefined,
    };
  },
  methods: {
    handleClickLoad() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
    },
    handleFileLoad() {
      this.file = this.$refs.refFile.files[0];
      this.data.splice(0, 1, {
        name: 'file',
        value: this.file,
      });
    },
  },
};
</script>

<style scoped></style>

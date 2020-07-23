export default {
  methods: {
    closeGlobalDialog() {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        visible: false,
      });
    },
    messageSuccess(message) {
      this.$message.success(message);
    },
    messageWarning(message) {
      this.$message.warning(message);
    },
    messageError(message) {
      this.$message.error(message);
    },
    filterEmptyData(data) {
      return data.filter(
        item =>
          item.name.trim() !== '' ||
          item.value.trim() !== '' ||
          item.remark.trim() !== '',
      );
    },
    arrayDataToObject(data) {
      return Object.fromEntries(
        this.filterEmptyData(data).map(item => [item.name, item.value]),
      );
    },
    objectDataToArray(data) {
      return Object.entries(data).map(item => ({
        name: item[0],
        value: item[1],
      }));
    },
  },
};

<template>
  <div style="font-size: 14px; margin: 8px;">
    JSON根类型：
    <el-select
      style="width: 130px; margin-bottom: 8px;"
      v-model="currentJsonType"
      placeholder="请选择"
      size="small"
    >
      <el-option
        v-for="item in JsonType"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <common-table :data-source="data" :hasChildren="true"></common-table>
  </div>
</template>

<script>
import CommonTable from '../common/CommonTable';
export default {
  name: 'ResponseParam',
  components: {
    CommonTable,
  },
  data() {
    return {
      baseData: {
        name: '',
        value: '',
        isRequired: true,
        remark: '',
        isRoot: true,
      },
      data: [],
      JsonType: ['Object', 'Array'],
      currentJsonType: 'Object',
    };
  },
  created() {
    this.data = [JSON.parse(JSON.stringify(this.baseData))];
  },
  methods: {
    handleChangeData(value) {
      this.data = value;
    },
    handleChangeCurrentJsonType(value) {
      this.currentJsonType = value;
    },
  },
};
</script>

<style scoped></style>

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
    <div style="float: right;">
      固定结构：
      <el-select
        style="width: 130px; margin-bottom: 8px;"
        v-model="dataStructure"
        placeholder="请选择"
        size="small"
      >
        <el-option
          v-for="item in dataStructureList"
          :key="item.name"
          :label="item.name"
          :value="item.data"
        ></el-option>
      </el-select>
    </div>
    <common-table :data-source="data" :hasChildren="true"></common-table>
  </div>
</template>

<script>
import CommonTable from '../common/CommonTable';
import { getDataStructure } from '../../api/dataStructure';
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
      dataStructureList: [],
      dataStructure: '',
      JsonType: ['Object', 'Array'],
      currentJsonType: 'Object',
    };
  },
  async created() {
    this.data = [JSON.parse(JSON.stringify(this.baseData))];
    const dataStructureList = await getDataStructure();
    this.dataStructureList = dataStructureList;
  },
  watch: {
    dataStructure(value) {
      this.handleChangeData(value);
    },
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

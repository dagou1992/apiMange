<template>
  <div class="base_data_form">
    <el-form label-position="top" label-width="80px" :model="baseDataForm">
      <el-form-item label="API Path">
        <el-input
          placeholder="请输入Path"
          v-model="baseDataForm.path"
          size="small"
        >
          <el-select
            style="width: 130px;"
            v-model="baseDataForm.type"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="item in requestTypeList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="API 名称">
        <el-input
          placeholder="请输入名称"
          v-model="baseDataForm.name"
          size="small"
        >
          <el-select
            style="width: 250px;"
            v-model="baseDataForm.group"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option
              v-for="{ name, id } in groupList"
              :key="id"
              :label="name"
              :value="id"
            ></el-option>
          </el-select>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGroupData } from '../../api/group';
import * as CONSTANT from '../../constant';
export default {
  name: 'BaseDataForm',
  data() {
    return {
      baseDataForm: {
        path: '',
        name: '',
        type: 'GET',
        group: '',
      },
      groupList: [],
    };
  },
  computed: {
    requestTypeList() {
      return Object.keys(CONSTANT.REQUEST_TYPE);
    },
  },
  methods: {
    handleChangeBaseDataForm(value) {
      this.baseDataForm = value;
    },
    initPage() {
      getGroupData().then(res => {
        this.groupList = res;
      });
    },
  },
  mounted() {
    this.initPage();
  },
};
</script>

<style lang="scss" scoped>
.base_data_form {
  .el-form-item {
    margin-bottom: 0;
    font-weight: bold;
  }
}
</style>

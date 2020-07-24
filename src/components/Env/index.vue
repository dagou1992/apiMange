<template>
  <div style="height: 100%;">
    <el-card style="padding-bottom: 15px; margin-bottom: 20px;">
      <h3>环境配置</h3>
      <p>项目环境可以帮助您快速切换测试的 API 地址前缀、全局变量等信息</p>
      <el-button type="success" size="small" @click="handleToCreate">
        <i class="el-icon-plus"></i> 新建环境
      </el-button>
    </el-card>
    <base-table
      :loading="loading"
      :table-list="tableList"
      :operations="operations"
      :table-data="tableData"
    ></base-table>
    <el-dialog
      :title="isEdit ? '编辑环境' : '新建环境'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="formData" label-width="80px">
        <el-form-item
          v-for="item in formList"
          :label="item.label"
          :key="item.label"
        >
          <el-input v-model="formData[item.value]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitEnv">
            提交
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEnvData,
  createEnvData,
  updateEnvData,
  deleteEnvData,
} from '../../api/env';

import mixin from '../mixin';
import BaseTable from '../common/BaseTable';
export default {
  name: 'index',
  data() {
    return {
      tableData: [],
      tableList: [
        { label: 'ID：', value: 'id', width: 100 },
        { label: '名称：', value: 'name' },
        { label: '备注：', value: 'remark', width: 240 },
        { label: '前置URL：', value: 'host' },
      ],
      operations: [
        { label: '编辑', onClick: row => this.handleToEdit(row) },
        {
          label: '删除',
          onClick: ({ id }) =>
            this.$store.dispatch('globalDialog/toggleDialogVisible', {
              message: `<span style="color: red;">确定要删除吗？</span>`,
              visible: true,
              onSubmit: () => this.handleToDeleteData(id),
            }),
        },
      ],
      formList: [
        { label: '环境名称', value: 'name' },
        { label: '环境备注', value: 'remark' },
        { label: 'Host', value: 'host' },
      ],
      formData: {
        name: '',
        remark: '',
        host: '',
      },
      dialogVisible: false,
      loading: false,
      isEdit: false,
    };
  },
  components: { BaseTable },
  mounted() {
    this.initPage();
  },
  mixins: [mixin],
  methods: {
    handleChangeDialogVisible(value) {
      this.dialogVisible = value;
    },
    async handleSubmitEnv() {
      const value = this.formData;
      if (
        Object.values(value).some(
          item => typeof item === 'string' && item.trim() === '',
        )
      ) {
        this.messageWarning('信息填写不完整');
        return;
      }
      let result;
      if (this.isEdit) {
        result = await updateEnvData(value);
      } else {
        result = await createEnvData(value);
      }
      if (result) {
        this.handleChangeDialogVisible(false);
        this.initPage();
      }
    },
    handleToCreate() {
      this.isEdit = false;
      this.formData = { name: '', remark: '', host: '' };
      this.handleChangeDialogVisible(true);
    },
    handleToEdit({ id, name, remark, host }) {
      this.handleChangeDialogVisible(true);
      this.isEdit = true;
      this.formData = { id, name, remark, host };
    },
    handleToDeleteData(id) {
      deleteEnvData(id).then(() => {
        this.messageSuccess('删除成功');
        this.closeGlobalDialog();
        this.initPage();
      });
    },
    initPage() {
      this.loading = true;
      getEnvData().then(res => {
        this.tableData = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  height: 20%;
  border: 0px;
}
</style>

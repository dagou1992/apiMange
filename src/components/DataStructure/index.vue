<template>
  <div style="height: 100%;" class="data-structure">
    <el-card style="padding-bottom: 15px; margin-bottom: 20px;">
      <h3>数据结构</h3>
      <p>
        您可以将 API 文档中相同的部分保存为数据结构，API
        文档通过引用数据结构可以减少编写文档的工作量
      </p>
      <el-button type="success" size="small" @click="handleToCreate">
        <i class="el-icon-plus"></i> 数据结构
      </el-button>
    </el-card>
    <base-table
      :loading="loading"
      :table-list="tableList"
      :operations="operations"
      :table-data="tableData"
    ></base-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="80%"
    >
      <template slot="title">
        <span>{{ isEdit ? '编辑数据结构' : '新建数据结构' }}</span>
        <el-button
          type="primary"
          style="margin-left: 15px;"
          @click="handleSubmitData"
          >提交</el-button
        >
      </template>
      <el-form :model="formData" label-width="55px">
        <el-form-item
          v-for="item in formList"
          :label="item.label"
          :key="item.label"
        >
          <el-input
            v-model="formData[item.value]"
            style="width: 20%;"
          ></el-input>
        </el-form-item>
      </el-form>
      <common-table
        :data-source="dialogTableData"
        :has-children="true"
        style="margin-bottom: 10px;"
      ></common-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDataStructure,
  createDataStructure,
  updateDataStructure,
  deleteDataStructure,
} from '../../api/dataStructure';
import { timestampToTime } from '../../util/time';

import mixin from '../mixin';
import BaseTable from '../common/BaseTable';
import CommonTable from '../common/CommonTable';
export default {
  name: 'index',
  data() {
    return {
      tableData: [{ name: '11' }],
      dialogTableData: [],
      formData: {
        name: '',
        remark: '',
      },
      formList: [
        { label: '名称：', value: 'name' },
        { label: '描述：', value: 'remark' },
      ],
      tableList: [
        { label: '数据结构', value: 'name' },
        { label: '描述', value: 'remark' },
        { label: '编辑时间', value: 'updatedTime', width: 200 },
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
      dialogVisible: false,
      loading: false,
      isEdit: false,
    };
  },
  components: { BaseTable, CommonTable },
  mounted() {
    this.initPage();
  },
  mixins: [mixin],
  methods: {
    handleChangeDialogVisible(value) {
      this.dialogVisible = value;
    },
    handleToCreate() {
      this.isEdit = false;
      this.handleChangeDialogVisible(true);
      this.formData = { name: '', remark: '' };
      this.dialogTableData = [];
    },
    async handleSubmitData() {
      const { isEdit, formData, dialogTableData } = this;
      if (
        Object.values(formData).some(
          item => typeof item === 'string' && item.trim() === '',
        ) ||
        dialogTableData.length === 0
      ) {
        this.messageWarning('信息填写不完全');
        return;
      }
      const param = {
        name: formData.name,
        remark: formData.remark,
        data: dialogTableData,
      };
      let result;
      if (isEdit) {
        param.id = formData.id;
        result = await updateDataStructure(param);
      } else {
        result = await createDataStructure(param);
      }
      if (result) {
        this.handleChangeDialogVisible(false);
        this.initPage();
      }
    },
    handleToEdit({ id, name, remark, data }) {
      this.handleChangeDialogVisible(true);
      this.formData = { id, name, remark };
      this.dialogTableData = data;
      this.isEdit = true;
    },
    handleToDeleteData(id) {
      deleteDataStructure(id).then(() => {
        this.messageSuccess('删除成功');
        this.closeGlobalDialog();
        this.initPage();
      });
    },
    initPage() {
      this.loading = true;
      getDataStructure().then(res => {
        this.tableData = res.map(item => ({
          ...item,
          updatedTime: timestampToTime(item.updatedTime),
        }));
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-structure {
  position: relative;
  z-index: 100;
}
</style>

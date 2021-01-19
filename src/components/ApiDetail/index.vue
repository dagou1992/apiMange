<template>
  <div>
    <el-row
      :gutter="20"
      style="border-bottom: 1px solid #ddd; padding-bottom: 5px;"
    >
      <el-col :span="22">
        <el-tag type="success">{{ data.type }}</el-tag>
        <span class="api_url" style="font-family: Apple;">{{ data.path }}</span>
        <p style="font-weight: bold;">{{ data.name }}</p>
        <p style="font-size: 12px; color: #999;">
          <span style="margin-right: 10px;">分组： {{ data.groupName }}</span>
          <span>更新时间：{{ data.updatedTime }}</span>
        </p>
      </el-col>
      <el-col :span="2" style="text-align: right;">
        <el-button type="success" @click="handleToEdit">
          <i class="el-icon-edit"></i> 编辑
        </el-button>
      </el-col>
    </el-row>
    <p class="title">请求参数</p>
    <common-table
      v-if="
        Object.keys(data.requestParam).every(
          item => !isVisibleRequestParam(item),
        )
      "
      :data-source="[]"
      :is-edit="false"
      :has-children="true"
    ></common-table>
    <template v-else v-for="item in Object.keys(data.requestParam)">
      <div :key="item" v-if="isVisibleRequestParam(item)">
        <el-tag effect="dark" style="font-size: 15px; margin: 15px 5px 15px 0;">
          {{ item }} 参数
        </el-tag>
        <el-tag v-if="item === 'body'" type="success">{{
          data.requestParam[item].model
        }}</el-tag>
        <ace-editor
          v-if="
            item === 'body' &&
            (data.requestParam.body.model === 'raw' ||
              data.requestParam.body.model === 'binary')
          "
          :content="{ value: data.requestParam.body.content.value }"
          :options="{ readOnly: true }"
        ></ace-editor>
        <common-table
          v-else
          :data-source="
            item === 'body'
              ? data.requestParam[item].data
              : data.requestParam[item]
          "
          :is-edit="false"
        ></common-table>
      </div>
    </template>
    <p class="title">返回参数</p>
    <el-tag style="margin-bottom: 10px;">
      JSON根类型： {{ data.responseParam.type }}
    </el-tag>
    <common-table
      :data-source="data.responseParam.data"
      :is-edit="false"
      :has-children="true"
    ></common-table>
    <p class="title">返回示例</p>
    <ace-editor
      :content="{ value: data.responseExample.value }"
      :options="{ readOnly: true }"
    ></ace-editor>
  </div>
</template>

<script>
import AceEditor from '../common/AceEditor';
import CommonTable from '../common/CommonTable';
export default {
  name: 'index',
  props: {
    data: Object,
  },
  components: { AceEditor, CommonTable },
  data() {
    return {
      tableData: new Array(2).fill({
        paramName: 'sum',
        paramType: 'string',
        isRequired: 1,
        remark: '总数',
      }),
      column: [
        { label: '参数名', value: 'name', width: 300 },
        { label: '类型', value: 'value', width: 180 },
        { label: '是否必填', value: 'isRequired', width: 150 },
        { label: '说明', value: 'remark' },
      ],
    };
  },
  methods: {
    handleToEdit() {
      this.$router.push({ name: 'ApiEditPage', query: { id: this.data.id } });
    },
    isVisibleRequestParam(key) {
      if (key !== 'body') {
        return this.data.requestParam[key].length > 0;
      } else {
        const { model } = this.data.requestParam[key];
        if (model === 'form-data' || model === 'x-www-form-urlencoded') {
          return this.data.requestParam[key].data.length > 0;
        } else {
          return this.data.requestParam[key].content.value.trim() !== '';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.api_url {
  line-height: 30px;
  height: 30px;
  display: inline-block;
  margin-left: 10px;
}
.title {
  font-size: 17px;
  border-left: 2px solid green;
  padding-left: 10px;
}
</style>

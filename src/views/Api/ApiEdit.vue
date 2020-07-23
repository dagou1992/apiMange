<template>
  <el-container v-loading="loading" class="api-edit">
    <el-header style="font-size: 12px; height: 40px;">
      <el-page-header @back="goBack"></el-page-header>
      <el-button
        type="success"
        size="small"
        style="position: absolute; top: 13px; left: 128px;"
        @click="saveData"
      >
        <i class="el-icon-save"></i> 保存
      </el-button>
    </el-header>
    <el-main>
      <p class="title">基本信息</p>
      <base-data-form ref="base_data_form"></base-data-form>
      <p class="title">请求参数</p>
      <request-param ref="request_param"></request-param>
      <p class="title">返回参数</p>
      <response-param ref="response_param"></response-param>
      <p class="title">返回示例</p>
      <response-example ref="response_example"></response-example>
    </el-main>
  </el-container>
</template>

<script>
import { createApiData, getApiData, updateApiData } from '../../api/api';
import mixin from '../../components/mixin';
import BaseDataForm from '../../components/ApiEdit/BaseDataForm';
import RequestParam from '../../components/ApiEdit/RequestParam';
import ResponseParam from '../../components/ApiEdit/ResponseParam';
import ResponseExample from '../../components/ApiEdit/ResponseExample';
export default {
  name: 'ApiEdit',
  components: {
    BaseDataForm,
    RequestParam,
    ResponseParam,
    ResponseExample,
  },
  data() {
    return {
      isEdit: false,
      loading: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.isEdit = true;
      this.initPage(id);
    }
  },
  mixins: [mixin],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    saveData() {
      const {
        base_data_form,
        request_param,
        response_param,
        response_example,
      } = this.$refs;
      const { path, name, group, type } = base_data_form.baseDataForm;
      const [header, body, query, rest] = request_param.tabList;
      if (path.trim() === '') {
        this.messageWarning('path是必填项');
        return;
      }
      if (name.trim() === '') {
        this.messageWarning('name是必填项');
        return;
      }
      if (group === '') {
        this.messageWarning('group是必填项');
        return;
      }
      const bodyData =
        body.model === 'form-data' || body.model === 'x-www-form-urlencoded'
          ? { data: this.filterEmptyData(body.data) }
          : { content: body.content };
      const param = {
        path,
        name,
        group: Number(group),
        type,
        requestParam: {
          header: this.filterEmptyData(header.data),
          body: {
            model: body.model,
            ...bodyData,
          },
          query: this.filterEmptyData(query.data),
          rest: this.filterEmptyData(rest.data),
        },
        responseParam: {
          data: this.filterEmptyData(response_param.data),
          type: response_param.currentJsonType,
        },
        responseExample: response_example.content,
      };
      if (this.isEdit) {
        const { id } = this.$route.query;
        updateApiData({ ...param, id }).then(() => {
          this.messageSuccess('修改成功');
          this.$router.push({ name: 'ApiDetailPage', query: { id } });
        });
      } else {
        createApiData(param).then(res => {
          this.messageSuccess('创建成功');
          this.$router.push({
            name: 'ApiDetailPage',
            query: { id: res.id },
          });
        });
      }
    },
    initPage(id) {
      this.loading = true;
      getApiData({ id }).then(res => {
        const {
          group,
          name,
          path,
          type,
          requestParam,
          responseParam,
          responseExample,
        } = res;
        const {
          base_data_form,
          request_param,
          response_param,
          response_example,
        } = this.$refs;
        const { header, body, query, rest } = requestParam;
        base_data_form.handleChangeBaseDataForm({
          group,
          name,
          path,
          type,
        });
        request_param.handleChangeHeaderData(header);
        request_param.handleChangeBodyData(body);
        request_param.handleChangeQueryData(query);
        request_param.handleChangeRestData(rest);
        response_example.handleChangeContent(responseExample);
        response_param.handleChangeData(responseParam.data);
        response_param.handleChangeCurrentJsonType(responseParam.type);
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.api-edit {
  position: relative;
  background-color: #fff;
  min-height: calc(100vh - 100px);
  padding: 20px;
  .title {
    font-size: 14px;
    border-left: 2px solid green;
    padding: 5px 0 5px 10px;
    background-color: #f8f8f8;
  }
  .el-main {
    max-height: calc(100vh - 190px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
  }
}
</style>

<template>
  <div :key="key">
    <el-row>
      <el-col :span="19">
        <el-input placeholder="请输入Path" v-model="path">
          <el-select
            style="width: 130px;"
            v-model="type"
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
      </el-col>
      <el-col :span="5">
        <el-button type="success" style="width: 100%;" @click="handleToTest">
          测 试
        </el-button>
      </el-col>
    </el-row>
    <div class="request_param_body">
      <div style="width: 100%; text-align: right;">
        <el-button type="text" @click="handleClearCookie">清除cookie</el-button>
      </div>
      <request-param
        ref="request_param"
        :is-test="true"
        :table-list="tableList"
      ></request-param>
      <div v-if="statusCode !== 0 && statusCode !== -1">
        <p
          class="title"
          :style="{ backgroundColor: responseBackgroundColor, color: '#fff' }"
        >
          返回结果
          <span style="float: right; font-size: 14px; margin-right: 10px;"
            >Status: {{ statusCode }} {{ statusMessage }}, Time:
            {{ time }}ms</span
          >
        </p>
        <el-tabs>
          <el-tab-pane label="Result">
            <response-example
              ref="response_example"
              :response-raw-mode="responseRawMode"
            ></response-example>
          </el-tab-pane>
          <el-tab-pane label="Headers">
            <p
              v-for="item in Object.keys(headers)"
              :key="item"
              style="font-size: 12px;"
            >
              {{ item }} -> {{ headers[item] }}
            </p>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-else>
        <p class="title">返回结果</p>
        <el-card shadow="always" class="response_card">
          <div v-if="statusCode === 0">
            <el-icon class="el-icon-bell" style="font-size: 20px;"></el-icon>
            点击
            <el-button type="success" size="small">
              测 试
            </el-button>
            按钮进行接口测试
          </div>
          <div v-else-if="statusCode === -1">
            <el-icon class="el-icon-loading" style="font-size: 22px;"></el-icon>
            拼命加载中...
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import RequestParam from '../ApiEdit/RequestParam';
import ResponseExample from '../ApiEdit/ResponseExample';

import { formatJson } from '../../util/formatJson';
import * as LOCALSTORAGE from '../../util/localstorage';
import * as CONSTANT from '../../constant';
import mixin from '../../components/mixin';
import { submitToTest, submitToSaveApiHistory } from '../../api/test';
export default {
  name: 'TestBody',
  data() {
    return {
      path: '',
      type: 'GET',
      statusCode: 0,
      time: 0,
      statusMessage: '',
      responseRawMode: 'JSON',
      activeTabName: 'Result',
      headers: {},
      tableList: [
        {
          key: 'name',
          label: '参数名',
          width: 250,
          options: CONSTANT.REQUEST_HEAD_TYPE.map(item => ({
            label: item,
            value: item,
          })),
        },
        {
          key: 'value',
          label: '值',
        },
      ],
      key: 0,
    };
  },
  components: { RequestParam, ResponseExample },
  computed: {
    ...mapGetters(['currentHistoryData']),
    requestTypeList() {
      return Object.keys(CONSTANT.REQUEST_TYPE);
    },
    responseBackgroundColor() {
      if (this.statusCode === 0) {
        return '#f8f8f8';
      } else {
        return this.statusCode === 200 ? '#85ce61' : '#d8132e';
      }
    },
  },
  watch: {
    path(path) {
      this.$emit('on-update-tab-label', path);
    },
    currentHistoryData({ path, type, requestParam }) {
      this.key += 1;
      this.$nextTick(() => {
        this.path = path;
        this.type = type;
        const { request_param } = this.$refs;
        const { header, body, query, rest } = requestParam;
        if (body) {
          if (body.model === 'raw') {
            body.content = {
              value: formatJson(body.data),
            };
          }
          if (
            body.model === 'form-data' ||
            body.model === 'x-www-form-urlencoded'
          ) {
            body.data = this.objectDataToArray(body.data);
          }
          request_param.handleChangeBodyData(body);
        }
        request_param.handleChangeHeaderData(this.objectDataToArray(header));
        request_param.handleChangeQueryData(this.objectDataToArray(query));
        request_param.handleChangeRestData(this.objectDataToArray(rest));
      });
    },
  },
  mixins: [mixin],
  methods: {
    handleToTest() {
      const { path, type } = this;
      const { request_param } = this.$refs;
      const [header, body, query, rest] = JSON.parse(
        JSON.stringify(request_param.tabList),
      );
      if (path.trim() === '') {
        this.messageWarning('path是必填项');
        return;
      }
      if (path.includes('?')) {
        let restParam = path.split('?')[1];
        if (restParam.includes('&')) {
          restParam = restParam.split('&');
        }
        restParam = restParam.map(item => ({
          name: item.split('=')[0],
          value: item.split('=')[1],
        }));
        this.$refs.request_param.handleChangeQueryData(restParam);
      }

      const { model, data } = body;
      const bodyData =
        model !== 'raw'
          ? model === 'binary'
            ? {
                data: request_param.tabList.find(item => item.key === 'body')
                  .data[0],
              }
            : { data: this.arrayDataToObject(data) }
          : JSON.parse(JSON.stringify({ data: body.content.value }));
      if (model === 'raw') {
        const currentRawMode = this.$refs.request_param.getCurrentRawMode();
        if (currentRawMode === 'JSON') {
          if (bodyData.data.includes('}')) {
            bodyData.data = JSON.parse(bodyData.data.replace(/↵/g, ''));
          } else {
            bodyData.data = {};
          }
        }
      }
      if (model === 'binary') {
        header.data.push({
          name: 'Content-Type',
          value: 'multipart/form-data',
        });
      }
      if (model === 'x-www-form-urlencoded') {
        header.data.push({
          name: 'Content-Type',
          value: 'application/x-www-form-urlencoded',
        });
      }
      const cookieList = LOCALSTORAGE.GET_LOCAL_STORAGE(
        'api_manage_cookie_list',
      );

      if (cookieList && path.includes('//')) {
        const host = path.split('//')[1].split('/')[0];
        if (JSON.parse(cookieList)[host]) {
          header.data.splice(0, 1, {
            name: 'Cookie',
            value: JSON.parse(cookieList)[host],
          });
        }
      }
      let param = {
        path,
        type,
        requestParam: {
          header: this.arrayDataToObject(header.data),
          query: this.arrayDataToObject(query.data),
          rest: this.arrayDataToObject(rest.data),
          body: {
            model: body.model,
            ...bodyData,
          },
        },
      };
      if (type === 'GET') {
        delete param.requestParam.body;
      }
      if (
        param.requestParam.body &&
        param.requestParam.body.model === 'binary'
      ) {
        const formData = new FormData();
        Object.entries(param).forEach(item => {
          const [key, value] = item;
          if (key === 'requestParam') {
            formData.append(value.body.data.name, value.body.data.value);
            Object.entries(value).forEach(s => {
              const [k, v] = s;
              formData.append(k, JSON.stringify(v));
            });
          } else {
            formData.append(key, value);
          }
        });
        param = formData;
      }
      this.statusCode = -1;
      submitToTest(param).then(res => {
        if (res.error) {
          this.statusCode = 0;
          this.messageError(res.error);
          return;
        }
        const {
          body,
          headers,
          statusCode,
          statusMessage,
          time,
          originalHost,
        } = res;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.time = time;
        this.headers = headers;
        const contentType = headers['content-type'];
        this.responseRawMode = 'JSON';
        if (contentType.includes('html')) {
          this.responseRawMode = 'HTML';
        }
        if (contentType.includes('xml')) {
          this.responseRawMode = 'XML';
        }
        if (contentType.includes('text/plain')) {
          this.responseRawMode = 'TEXT';
        }
        const value = this.responseRawMode === 'JSON' ? formatJson(body) : body;
        this.$nextTick(() => {
          this.$refs.response_example.handleChangeContent({
            value: value,
          });
        });
        if (headers['set-cookie']) {
          let cookieList = LOCALSTORAGE.GET_LOCAL_STORAGE(
            'api_manage_cookie_list',
          );
          cookieList = cookieList ? JSON.parse(cookieList) : {};
          if (!cookieList[originalHost]) {
            cookieList[originalHost] = headers['set-cookie'][0];
          }
          LOCALSTORAGE.SET_LOCAL_STORAGE(
            'api_manage_cookie_list',
            JSON.stringify(cookieList),
          );
        }
        submitToSaveApiHistory(param).then(() => {
          this.$store.dispatch('history/getHistoryList');
        });
      });
    },
    handleClearCookie() {
      LOCALSTORAGE.CLEAR_LOCAL_STORAGE('api_manage_cookie_list');
      this.messageSuccess('清除成功');
    },
  },
};
</script>

<style scoped>
.request_param_body {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  margin-top: 10px;
}
.title {
  font-size: 14px;
  border-left: 2px solid green;
  padding: 5px 0 5px 10px;
  background-color: #f8f8f8;
}
.response_card {
  height: 330px;
  border: 2px solid #ddd;
  line-height: 280px;
  text-align: center;
  font-size: 17px;
}
</style>

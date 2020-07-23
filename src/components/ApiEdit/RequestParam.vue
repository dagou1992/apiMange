<template>
  <div class="request_param">
    <el-tabs
      v-model="activeTabName"
      type="border-card"
      @tab-click="handleTabClick"
    >
      <el-tab-pane v-for="item in tabList" :name="item.key" :key="item.key">
        <div slot="label">
          {{ item.label }}
          <el-tooltip
            v-if="item.tooltip"
            class="item"
            effect="dark"
            :content="item.tooltip"
            placement="top"
          >
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
          <el-badge
            v-if="item.data.length > 0 && item.data.some(s => s.name !== '')"
            class="mark"
            :value="item.data.length"
          />
        </div>
        <div class="container">
          <template v-if="item.key === 'body'">
            <el-radio-group
              v-model="item.model"
              style="padding: 0 10px 15px 10px;"
              @change="handleModelChange"
            >
              <el-radio v-for="r in item.modelList" :key="r" :label="r">{{
                r
              }}</el-radio>
            </el-radio-group>
          </template>
          <ace-editor
            v-if="item.model === 'raw'"
            :content="item.content"
            ref="ace_editor"
          ></ace-editor>
          <el-input
            v-else-if="item.model === 'binary' && !isTest"
            type="textarea"
            :rows="3"
            placeholder="参数描述"
            v-model="item.content.value"
          >
          </el-input>
          <binary-file
            v-else-if="item.model === 'binary' && isTest"
            :data="item.data"
          ></binary-file>
          <common-table
            v-else
            :key="activeTabName"
            :activeTabName="activeTabName"
            :data-source="item.data"
            :table-list="tableList"
          ></common-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AceEditor from '../common/AceEditor';
import BinaryFile from '../common/BinaryFile';
import CommonTable from '../common/CommonTable';
export default {
  name: 'RequestParam',
  props: {
    tableList: Array,
    isTest: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AceEditor,
    BinaryFile,
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
      tabList: [
        {
          label: '请求头部',
          key: 'header',
          data: [],
        },
        {
          label: '请求体',
          key: 'body',
          data: [],
          model: 'form-data',
          content: { value: '' },
          modelList: ['form-data', 'x-www-form-urlencoded', 'raw', 'binary'],
        },
        {
          label: 'Query参数',
          key: 'query',
          data: [],
          tooltip: '指的是地址栏中跟在问号后面的参数，如/login/?username=admin',
        },
        {
          label: 'REST参数',
          key: 'rest',
          data: [],
          tooltip: '指的是地址栏中被斜杠分割的参数，如/login/{username}',
        },
      ],
      activeTabName: 'body',
      apiType: 'GET',
    };
  },
  created() {
    this.tabList = this.tabList.map(item => ({
      ...item,
      data: [JSON.parse(JSON.stringify(this.baseData))],
    }));
  },
  methods: {
    handleChangeHeaderData(value) {
      this.tabList.find(item => item.key === 'header').data = value;
    },
    handleChangeBodyData(value) {
      const { model } = value;
      const item = this.tabList.find(item => item.key === 'body');
      item.model = model;
      if (model === 'form-data' || model === 'x-www-form-urlencoded') {
        item.data = value.data;
      } else {
        item.content = value.content;
      }
    },
    handleChangeQueryData(value) {
      this.tabList.find(item => item.key === 'query').data = value;
    },
    handleChangeRestData(value) {
      this.tabList.find(item => item.key === 'rest').data = value;
    },
    handleTabClick({ name }) {
      this.activeTabName = name;
    },
    handleModelChange(value) {
      this.tabList = this.tabList.map(item => {
        if (item.key === 'body') {
          item.data = [JSON.parse(JSON.stringify(this.baseData))];
          item.content = { value: '' };
          item.model = value;
        }
        return item;
      });
    },
    getCurrentRawMode() {
      if (this.$refs.ace_editor) {
        return this.$refs.ace_editor[0].currentRawMode;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.request_param {
  .container {
    min-height: 100px;
    margin: -15px;
    margin-top: 5px;
  }
  span {
    color: #1890ef;
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
}
</style>

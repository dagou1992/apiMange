<template>
  <el-aside width="330px" style="overflow: visible;">
    <el-card
      class="box-card"
      :body-style="{
        paddingLeft: 0,
        paddingRight: 0,
        border: 0,
        height: '100%',
        overflow: 'auto',
        marginTop: '-10px',
      }"
    >
      <div slot="header">
        <div style="margin: -4px -5px;">
          测试历史
          <el-button
            style="float: right; padding: 3px 0;"
            type="text"
            @click="handleClearHistory"
          >
            清空
          </el-button>
        </div>
      </div>
      <el-menu>
        <el-menu-item
          v-for="item in historyList"
          :key="`${item.type}_${item.path}`"
          style="height: auto;"
          @click="handleHistoryClick(item)"
        >
          <template slot="title">
            <el-row>
              <el-col :span="6" style="text-align: center;">
                <el-tag :type="requestTypeList[item.type]">{{
                  item.type
                }}</el-tag>
              </el-col>
              <el-col :span="18">
                <span class="url">{{ item.path }}</span>
              </el-col>
            </el-row>
          </template>
        </el-menu-item>
      </el-menu>
    </el-card>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
import * as CONSTANT from '../../constant';
export default {
  name: 'TestSider',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['historyList']),
    requestTypeList() {
      return CONSTANT.REQUEST_TYPE;
    },
  },
  mounted() {
    this.$store.dispatch('history/getHistoryList');
  },
  methods: {
    handleHistoryClick(item) {
      this.$store.dispatch('history/showHistoryData', item);
    },
    handleClearHistory() {
      this.$store.dispatch('history/clearHistoryData');
    },
  },
};
</script>

<style scoped>
.el-card {
  height: 100%;
}
.clear {
  font-size: 12px;
  color: #1890ef;
  text-decoration: underline;
}
.url {
  width: 100%;
  max-height: 70px;
  line-height: 25px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding: 5px 0;
  color: #807e7e;
  font-family: Arial;
}
</style>

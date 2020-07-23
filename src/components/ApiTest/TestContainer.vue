<template>
  <el-container style="padding-left: 5px;">
    <el-card class="container">
      <el-button
        type="success"
        size="small"
        @click="handleTabsAdd"
        style="width: 100px;"
      >
        <i class="el-icon-plus"></i> 新建
      </el-button>
      <el-tabs
        v-model="activeTab"
        type="card"
        closable
        @tab-remove="handleTabsRemove"
        style="margin-top: 10px;"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.index"
          :name="item.index.toString()"
        >
          <span slot="label" class="tab_label">
            {{ item.label }}
          </span>
          <test-body
            @on-update-tab-label="handleUpdateTabLabel($event, item.index)"
          ></test-body>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-container>
</template>

<script>
import TestBody from './TestBody';
export default {
  name: 'TestContainer',
  data() {
    return {
      activeTab: '0',
      tabList: [{ index: 0, label: '新标签' }],
    };
  },
  components: { TestBody },
  methods: {
    handleTabsAdd() {
      const newIndex = this.tabList.length;
      this.tabList.push({ index: this.tabList.length, label: '新标签' });
      this.activeTab = newIndex.toString();
    },
    handleTabsRemove(name) {
      const index = Number(name);
      if (index !== 0) {
        this.tabList = this.tabList.filter(item => item.index !== index);
        this.activeTab = (index - 1).toString();
      }
    },
    handleUpdateTabLabel(path, index) {
      this.tabList.find(item => item.index === index).label = path;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  border: 0px;
  width: 100%;
  .tab_label {
    max-width: 150px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }
}
</style>

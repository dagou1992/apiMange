<template>
  <el-container class="api-detail">
    <el-header style="font-size: 12px; height: 40px;">
      <el-page-header @back="goBack" />
    </el-header>
    <el-main v-loading="loading">
      <el-tabs v-model="activeTabName" type="card" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
          <div class="tab-container">
            <api-detail-component
              v-if="item.key === 'api' && Object.keys(data).length > 0"
              :data="data"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import { timestampToTime } from '../../util/time';
import { getApiData } from '../../api/api';
import ApiDetailComponent from '../../components/ApiDetail';
export default {
  name: 'ApiDetail',
  components: {
    'api-detail-component': ApiDetailComponent,
  },
  data() {
    return {
      tabList: [
        { label: 'API', key: 'api' },
        // { label: '测试', key: 'test' },
      ],
      activeTabName: 'api',
      data: {},
      loading: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.loading = true;
    getApiData({ id }).then(res => {
      this.data = {
        ...res,
        updatedTime: timestampToTime(res.updatedTime),
      };
      this.loading = false;
    });
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ApiPage' });
    },
    handleTabClick({ name }) {
      this.activeTabName = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.api-detail {
  background-color: #fff;
  min-height: calc(100vh - 100px);
  padding: 20px;
  .el-main {
    padding: 0;
  }
  .tab-container {
    max-height: calc(100vh - 240px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
  }
}
</style>

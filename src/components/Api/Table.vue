<template>
  <el-container class="api-table">
    <el-header style="font-size: 12px;">
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content">
            <el-button type="success" size="small" @click="handleToAdd">
              <i class="el-icon-plus"></i> 新建 API
            </el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="searchValue" placeholder="搜索API" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleToSearch"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div class="table-container">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="min-height: 100%;"
          :header-cell-style="{
            background: '#f8f8f8',
            color: '#333',
            borderLeft: '1px solid #ddd',
          }"
          :row-style="{ cursor: 'pointer', letterSpacing: '1px' }"
          @cell-click="cellClick"
        >
          <el-table-column
            v-for="item in column"
            :key="item.value"
            :prop="item.value"
            :label="item.label"
            :sortable="item.sortable"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div v-if="item.value === 'type'">
                <el-tag
                  disable-transitions
                  :type="item.type[scope.row.type] || ''"
                  >{{ scope.row.type }}</el-tag
                >
              </div>
              <div v-else>
                {{ scope.row[item.value] }}
              </div>
            </template>
          </el-table-column>
          <table-operation :operations="operations" />
        </el-table>
      </div>
      <div class="table-footer">
        <el-row :gutter="20">
          <el-col :offset="16" :span="8" style="text-align: right;">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next"
              :total="total"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              :current-page="pageIndex"
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { getApiData, deleteApiData } from '../../api/api';
import { timestampToTime } from '../../util/time';
import TableOperation from '../common/TableOperation';
import mixin from '../mixin';
export default {
  name: 'Table',
  components: { TableOperation },
  data() {
    return {
      tableData: [],
      column: [
        { label: 'ID', value: 'id', width: 100 },
        { label: 'API Name', value: 'name' },
        {
          label: '请求方式',
          value: 'type',
          width: 100,
          type: {
            GET: '',
            POST: 'success',
            PUT: 'warning',
            DELETE: 'danger',
          },
        },
        { label: 'URL', value: 'path' },
        { label: '更新时间', value: 'updatedTime', sortable: true },
      ],
      operations: [
        {
          label: '编辑',
          onClick: ({ id }) =>
            this.$router.push({ name: 'ApiEditPage', query: { id } }),
        },
        {
          label: '新标签打开',
          onClick: ({ id }) => window.open(`#/api/detail?id=${id}`),
        },
        {
          label: '删除',
          onClick: ({ id, group }) =>
            this.$store.dispatch('globalDialog/toggleDialogVisible', {
              message: `<span style="color: red;">确定要删除吗？</span>`,
              visible: true,
              onSubmit: () => this.handleToDeleteData({ id, group }),
            }),
        },
      ],
      loading: false,
      searchValue: '',
      pageIndex: 1,
      pageSize: 20,
      total: 0,
    };
  },
  computed: {
    ...mapGetters(['activeGroup']),
  },
  watch: {
    activeGroup() {
      this.initPage();
    },
    pageIndex() {
      this.initPage();
    },
    pageSize() {
      this.initPage();
    },
  },
  mounted() {
    this.initPage();
  },
  mixins: [mixin],
  methods: {
    cellClick({ id }, column, cell) {
      if (cell.getElementsByTagName('span').length === 0) {
        this.$router.push({ name: 'ApiDetailPage', query: { id } });
      }
    },
    handleToAdd() {
      this.$router.push({ name: 'ApiEditPage' });
    },
    handleToDeleteData(value) {
      deleteApiData(value).then(() => {
        this.messageSuccess('删除成功');
        this.closeGlobalDialog();
        this.initPage();
      });
    },
    handleToSearch() {
      this.initPage();
    },
    handlePageChange(value) {
      this.pageIndex = value;
    },
    handleSizeChange(value) {
      this.pageSize = value;
    },
    async initPage() {
      this.loading = true;
      const { activeGroup, searchValue, pageIndex, pageSize } = this;
      const param = {
        group: activeGroup,
        pageIndex,
        pageSize,
      };
      if (searchValue.trim() !== '') {
        param.value = searchValue;
      }
      const res = await getApiData(param);
      if (res) {
        this.tableData = res.data
          .map(item => ({
            ...item,
            createdTime: timestampToTime(item.createdTime),
            updatedTime: timestampToTime(item.updatedTime),
          }))
          .sort((a, b) => a.createdTime - b.createdTime);
        this.total = res.total;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.api-table {
  position: relative;
  .el-header {
    background-color: #fff;
    color: #333;
    margin-left: 5px;
    line-height: 60px;
    border: 1px solid #ddd;
    border-bottom: 0px;
  }
  .el-main {
    padding: 0 0 0 5px;
    border-top: 1px solid #ddd;
  }
  .table-footer {
    height: 6.8%;
    border: 1px solid #ddd;
    border-top: 0;
    background-color: #f8f8f8;
    width: 100%;
    font-size: 12px;
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .table-container {
    height: 93%;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-top: 0;
  }
  .el-pagination {
    padding: 10px;
    line-height: 0;
    box-sizing: border-box;
  }
}
</style>

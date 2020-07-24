<template>
  <el-aside
    class="api_sider"
    width="280px"
    style="background-color: rgb(238, 241, 246);"
  >
    <el-card class="box-card" :body-style="{ padding: 0 }">
      <div slot="header">
        <div style="margin: -4px -5px;">
          <el-button type="success" size="small" @click="handleToAddGroup">
            <i class="el-icon-plus"></i> 新建分组
          </el-button>
        </div>
      </div>
      <div style="margin: 8px;">
        <el-input
          clearable
          placeholder="搜索分组"
          size="small"
          v-model="groupSearchValue"
          @change="handleSearchGroup"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-tag type="info" @click="handleMenuClick(undefined)">所有API</el-tag>
      <p
        v-if="menuList.length === 0"
        style="
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: #909399;
        "
      >
        <i class="el-icon-files"></i> 暂无数据
      </p>
      <el-menu
        v-loading="menuLoading"
        :default-active="activeGroup ? activeGroup.toString() : activeGroup"
        @select="handleMenuClick"
      >
        <el-menu-item
          v-for="{ name, id } in menuList"
          :index="id.toString()"
          :key="id"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="grid-content">
                <span slot="title">{{ name }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <el-dropdown trigger="click" @command="handleGroupClick">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="{ type: 'edit', value: { name, id } }"
                      >编辑</el-dropdown-item
                    >
                    <el-dropdown-item :command="{ type: 'delete', value: id }"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-menu-item>
      </el-menu>
    </el-card>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getGroupData,
  createGroupData,
  updateGroupData,
  deleteGroupData,
} from '../../api/group';
import mixin from '../mixin';

export default {
  name: 'Sider',
  data() {
    return {
      menuList: [],
      menuLoading: false,
      groupSearchValue: '',
    };
  },
  computed: {
    ...mapGetters(['activeGroup']),
  },
  mixins: [mixin],
  methods: {
    handleSearchGroup(value) {
      this.initPage(value.trim() === '' ? undefined : value);
    },
    handleMenuClick(value) {
      this.$store.dispatch('group/changeActiveGroup', value);
    },
    handleGroupClick(param) {
      const { type, value } = param;
      type === 'edit'
        ? this.handleToEditGroup(value)
        : this.handleToDeleteGroup(value);
    },
    handleToAddGroup() {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        title: '新建分组',
        type: 'input',
        visible: true,
        onSubmit: name => this.submitCreateGroup(name),
      });
    },
    handleToEditGroup(preValue) {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        title: '编辑分组',
        type: 'input',
        visible: true,
        value: preValue.name,
        onSubmit: name => this.submitUpdateGroup(preValue.id, name),
      });
    },
    handleToDeleteGroup(id) {
      this.$store.dispatch('globalDialog/toggleDialogVisible', {
        message: `<span style="color: red;">确定要删除吗？</span>`,
        visible: true,
        onSubmit: () => this.submitDeleteGroup(id),
      });
    },
    submitCreateGroup(name) {
      createGroupData({ name }).then(() => {
        this.messageSuccess('添加成功');
        this.initPage();
      });
    },
    submitUpdateGroup(id, name) {
      updateGroupData({ id, name }).then(() => {
        this.messageSuccess('修改成功');
        this.initPage();
      });
    },
    submitDeleteGroup(id) {
      deleteGroupData(id).then(() => {
        this.messageSuccess('删除成功');
        this.initPage();
      });
    },
    initPage(name) {
      this.closeGlobalDialog();
      this.menuLoading = true;
      getGroupData({ name }).then(res => {
        this.menuLoading = false;
        this.menuList = res;
      });
    },
  },
  mounted() {
    this.initPage();
  },
};
</script>

<style lang="scss" scoped>
.api_sider {
  border: 1px solid #ddd;
  .el-card {
    border: 0px;
    height: 100%;
  }
  .el-menu-item {
    height: 35px;
    line-height: 35px;
  }
  .el-menu {
    border-right: 0px;
    text-align: left;
    height: 100%;
  }
  .el-menu-item.is-active {
    background-color: #ecf5ff;
  }
  .el-tag {
    width: 100%;
    border: 0px;
    text-align: left;
    cursor: pointer;
    padding-left: 20px;
  }
}
</style>

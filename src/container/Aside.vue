<template>
  <el-aside class="aside" style="width: 200px;">
    <el-menu
      :default-active="activePath"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="menuClick"
      style="padding-top: 10px; box-sizing: border-box;"
    >
      <template v-for="item in menuList">
        <el-submenu
          v-if="item.children.length > 0"
          index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="s in item.children"
            :index="s.path"
            :key="s.path"
          >
            <i :class="s.icon"></i>
            <span slot="title">{{ s.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  computed: {
    menuList() {
      return this.$router.options.routes
        .filter(item => !item.isHidden)
        .map(item => ({
          ...item,
          children: item.children.filter(item => item.onSide),
        }));
    },
    activePath() {
      return this.$router.history.current.path;
    },
  },
  methods: {
    menuClick(index) {
      this.$router.push(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  .el-menu {
    border-right: 0px;
    text-align: left;
    height: 100%;
  }
  .el-menu-item [class^='el-icon-'],
  .el-submenu [class^='el-icon-'] {
    margin-right: 30px;
  }
}
</style>

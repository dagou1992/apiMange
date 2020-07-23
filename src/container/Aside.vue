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
      <el-menu-item
        v-for="item in menuList"
        :index="item.path"
        :key="item.path"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  computed: {
    menuList() {
      return this.$router.options.routes;
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
  .el-menu-item [class^='el-icon-'] {
    margin-right: 30px;
  }
}
</style>

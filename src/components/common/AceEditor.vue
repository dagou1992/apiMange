<template>
  <div style="font-size: 14px; margin: 8px;">
    内容类型：
    <el-select
      style="width: 130px; margin-bottom: 8px;"
      v-model="currentRawMode"
      placeholder="请选择"
      size="small"
    >
      <el-option
        v-for="item in rawMode"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <editor
      v-model="content.value"
      @init="editorInit"
      :lang="currentRawMode.toLowerCase()"
      theme="chrome"
      width="100%"
      height="200"
      style="border: 1px solid #ddd;"
      :options="options"
    ></editor>
  </div>
</template>

<script>
export default {
  name: 'AceEditor',
  components: {
    editor: require('vue2-ace-editor'),
  },
  props: {
    content: Object,
    options: {
      type: Object,
      default: () => {},
    },
    responseRawMode: String,
  },
  data() {
    return {
      currentRawMode: 'JSON',
      rawMode: ['JSON', 'TEXT', 'HTML', 'XML'],
    };
  },
  mounted() {
    if (this.responseRawMode) {
      this.currentRawMode = this.responseRawMode;
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools');
      require('brace/ext/searchbox');
      require('brace/mode/json');
      require('brace/mode/text');
      require('brace/mode/html');
      require('brace/mode/xml');
      require('brace/theme/chrome');
      require('brace/snippets/json');
      require('brace/snippets/text');
      require('brace/snippets/html');
      require('brace/snippets/xml');
    },
  },
};
</script>

<style scoped></style>

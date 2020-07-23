<template>
  <ace-editor
    :content="content"
    :response-raw-mode="responseRawMode"
  ></ace-editor>
</template>

<script>
import AceEditor from '../common/AceEditor';
export default {
  name: 'ResponseExample',
  props: {
    responseRawMode: String,
  },
  components: {
    AceEditor,
  },
  data() {
    return {
      content: { value: '' },
    };
  },
  methods: {
    handleChangeContent(value) {
      this.content = value;
    },
  },
};
</script>

<style scoped></style>

<template>
  <vxe-table
    border
    resizable
    :data="dataSource"
    :edit-config="isEdit ? { trigger: 'click', mode: 'row' } : {}"
    :tree-config="{
      children: 'children',
      expandAll: true,
    }"
    row-id="id"
    ref="xTree"
  >
    <vxe-table-column v-if="isEdit" width="55">
      <template v-slot:header>
        <el-button
          icon="el-icon-plus"
          circle
          style="padding: 7px;"
          @click="handleAddParam"
        ></el-button>
      </template>
    </vxe-table-column>
    <vxe-table-column
      v-for="item in tableList"
      :key="item.key"
      :field="item.key"
      :title="item.label"
      :width="item.width"
      :tree-node="item.key === 'name' && hasChildren"
      :edit-render="
        (item.type === 'select' && activeTabName !== 'header') ||
        (activeTabName === 'header' && item.key === 'name') ||
        (activeTabName === 'header' && item.key === 'isRequired')
          ? { name: '$select', options: item.options }
          : { name: 'input' }
      "
    >
    </vxe-table-column>
    <vxe-table-column v-if="isEdit" title="操作" width="180">
      <template v-slot="{ row, $rowIndex }">
        <span @click="handleDeleteParam(row)">
          删除
        </span>
        <el-divider
          v-if="hasChildren && !row.isRoot"
          direction="vertical"
        ></el-divider>
        <span v-if="hasChildren" @click="handleAddChildren(row, $rowIndex)">
          添加子字段
        </span>
      </template>
    </vxe-table-column>
  </vxe-table>
</template>

<script>
import * as CONSTANT from '../../constant';
export default {
  name: 'CommonTable',
  props: {
    activeTabName: String,
    isEdit: {
      type: Boolean,
      default: true,
    },
    dataSource: Array,
    tableList: {
      type: Array,
      default: () => [
        {
          key: 'name',
          label: '参数名',
          width: 250,
          options: CONSTANT.REQUEST_HEAD_TYPE.map(item => ({
            label: item,
            value: item,
          })),
        },
        {
          key: 'value',
          label: '类型',
          width: 250,
          type: 'select',
          options: CONSTANT.TYPE.map(item => ({ label: item, value: item })),
        },
        {
          key: 'isRequired',
          label: '是否必填',
          width: 100,
          type: 'select',
          options: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
        { key: 'remark', label: '说明' },
      ],
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeConfig: {
        children: 'children',
        expandAll: true,
      },
    };
  },
  computed: {
    baseData() {
      return Object.fromEntries(
        this.tableList.map(item => {
          let value = '';
          if (item.key === 'isRequired') {
            value = true;
          }
          return [item.key, value];
        }),
      );
    },
  },
  methods: {
    getRowNode(row) {
      return this.$utils.findTree(
        this.dataSource,
        item => item.id === row.id,
        this.treeConfig,
      );
    },
    handleAddParam() {
      this.dataSource.push(JSON.parse(JSON.stringify(this.baseData)));
    },
    handleDeleteParam(row) {
      const { index, parent } = this.getRowNode(row);
      const data = !parent ? this.dataSource : parent.children;
      data.splice(index, 1);
      const xTree = this.$refs.xTree;
      xTree.syncData();
    },
    handleAddChildren(row) {
      const { index, parent, item } = this.getRowNode(row);
      // 如果是祖节点 parent为null
      const data = !parent ? this.dataSource[index] : parent.children[index];
      let id = '';
      if (data.children) {
        id = `${item.id}_${data.children.length}`;
        data.children.push({
          ...JSON.parse(JSON.stringify(this.baseData)),
          id,
        });
      } else {
        id = `${item.id}_0`;
        data.children = [
          {
            ...JSON.parse(JSON.stringify(this.baseData)),
            id,
          },
        ];
      }
      !parent && this.dataSource.splice(index, 1, data);
      const xTree = this.$refs.xTree;
      xTree.setTreeExpand(row, true);
    },
  },
};
</script>

<style scoped>
span {
  color: #1890ef;
  cursor: pointer;
}
span:hover {
  text-decoration: underline;
}
</style>

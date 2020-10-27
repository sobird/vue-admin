<!--
 - nested.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 14:48:45 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <h3>Nested draggable</h3>
      <nested-draggable :tasks="list" />
    </el-col>

    <el-col :span="12">
      <h3>List</h3>
      <MonacoEditor v-model="listText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import nestedDraggable from './components/nested-draggable';
export default {
  name: 'nested-example',
  display: 'Nested',
  order: 15,
  components: {
    nestedDraggable,
  },
  data() {
    return {
      list: [
        {
          name: 'task 1',
          tasks: [
            {
              name: 'task 2',
              tasks: [],
            },
          ],
        },
        {
          name: 'task 3',
          tasks: [
            {
              name: 'task 4',
              tasks: [],
            },
          ],
        },
        {
          name: 'task 5',
          tasks: [],
        },
      ],
    };
  },
  computed: {
    listText: {
      get() {
        return JSON.stringify(this.list, null, 2);
      },
      set() {},
    },
  },
};
</script>
<style scoped></style>

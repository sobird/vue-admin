<!--
 - clone-on-control.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 11:36:09 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :clone="clone"
        :group="{ name: 'people', pull: pullFunction }"
        @start="start"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item" :key="element.id">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </el-col>

    <el-col :span="6">
      <h3>Draggable 2</h3>
      <draggable class="dragArea list-group" :list="list2" group="people" item-key="id">
        <template #item="{ element }">
          <div class="list-group-item" :key="element.id">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </el-col>

    <el-col :span="6">
      <MonacoEditor v-model="listText1" style="height: 400px;" />
    </el-col>

    <el-col :span="6">
      <MonacoEditor v-model="listText2" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
let idGlobal = 8;
export default {
  name: 'clone-on-control',
  display: 'Clone on Control',
  instruction: 'Press Ctrl to clone element from list 1',
  order: 4,
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: 'Jesus', id: 1 },
        { name: 'Paul', id: 2 },
        { name: 'Peter', id: 3 },
      ],
      list2: [
        { name: 'Luc', id: 5 },
        { name: 'Thomas', id: 6 },
        { name: 'John', id: 7 },
      ],
      controlOnStart: true,
    };
  },
  computed: {
    listText1: {
      get() {
        return JSON.stringify(this.list1, null, 2);
      },
      set() {},
    },
    listText2: {
      get() {
        return JSON.stringify(this.list2, null, 2);
      },
      set() {},
    },
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? 'clone' : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
  },
};
</script>
<style scoped></style>

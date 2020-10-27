<!--
 - simple.vue
 - 
 - sobird<i@sobird.me> at 2020/10/26 21:42:25 created.
-->
<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <div class="form-group">
        <el-button-group>
          <el-button type="primary" @click="add">Add</el-button>
          <el-button type="primary" @click="replace">Replace</el-button>
        </el-button-group>

        <div class="form-check">
          <el-checkbox v-model="enabled">DnD enabled</el-checkbox>
        </div>
      </div>
    </el-col>

    <el-col :span="8">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        tag="ul"
        :list="list"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <li class="list-group-item" v-for="element in list" :key="element.name">
          {{ element.name }}
        </li>
      </draggable>
    </el-col>

    <el-col :span="8">
      <MonacoEditor v-model="listText" style="height: 300px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
let id = 1;

export default {
  name: 'simple',
  display: 'Simple',
  order: 0,
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
    listText: {
      get() {
        return JSON.stringify(this.list, null, 2);
      },
      set() {},
    },
  },
  methods: {
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: 'Edgard', id: id++ }];
    },
    checkMove: function(e) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex);
    },
  },
};
</script>
<style scoped>
</style>

<!--
 - handle.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 11:48:35 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-button type="primary" @click="add">Add</el-button>
    </el-col>

    <el-col :span="8">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable tag="ul" :list="list" class="list-group" handle=".handle">
        <li class="list-group-item" v-for="(element, idx) in list" :key="element.name">
          <i class="iconfont icon-bars handle"></i>

          <span class="text">{{ element.name }}</span>

          <input type="text" class="form-control" v-model="element.text" />

          <i class="el-icon-close close" @click="removeAt(idx)"></i>
        </li>
      </draggable>
    </el-col>

    <el-col :span="8">
      <MonacoEditor v-model="listText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
let id = 3;
import draggable from 'vuedraggable';
export default {
  name: 'handle',
  display: 'Handle',
  instruction: 'Drag using the handle icon',
  order: 5,
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        { name: 'John', text: '', id: 0 },
        { name: 'Joao', text: '', id: 1 },
        { name: 'Jean', text: '', id: 2 },
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
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function() {
      id++;
      this.list.push({ name: 'Juan ' + id, id, text: '' });
    },
  },
};
</script>
<style scoped>
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
</style>

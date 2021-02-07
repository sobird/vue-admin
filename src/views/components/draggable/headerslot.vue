<!--
 - headerslot.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 14:37:20 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <h3>Draggable with header</h3>

      <draggable
        :list="list"
        class="list-group"
        draggable=".item"
        @start="dragging = true"
        @end="dragging = false"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item item" :key="element.name">
            {{ element.name }}
          </div>
        </template>

        <template #header>
          <div class="btn-group list-group-item" role="group" aria-label="Basic example">
            <el-button type="primary" @click="add">Add</el-button>
            <el-button @click="replace">Replace</el-button>
          </div>
        </template>
      </draggable>
    </el-col>

    <el-col :span="12">
      <MonacoEditor v-model="listText" style="height: 300px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
let id = 1;
export default {
  name: 'headerslot',
  display: 'Header slot',
  order: 13,
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        { name: 'John 1', id: 0 },
        { name: 'Joao 2', id: 1 },
        { name: 'Jean 3', id: 2 },
      ],
      dragging: false,
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
  methods: {
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: 'Edgard', id: id++ }];
    },
  },
};
</script>
<style scoped></style>

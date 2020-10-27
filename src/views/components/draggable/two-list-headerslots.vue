<!--
 - two-list-headerslots.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 14:42:17 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <h3>First draggable with header</h3>

      <draggable
        id="first"
        data-source="juju"
        :list="list"
        class="list-group"
        draggable=".item"
        group="a"
      >
        <div class="list-group-item item" v-for="element in list" :key="element.name">
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        >
          <el-button type="primary" @click="add">Add</el-button>
          <el-button @click="replace">Replace</el-button>
        </div>
      </draggable>
    </el-col>

    <el-col :span="6">
      <h3>Second draggable with header</h3>

      <draggable :list="list2" class="list-group" draggable=".item" group="a">
        <div class="list-group-item item" v-for="element in list2" :key="element.name">
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        >
          <el-button type="primary" @click="add2">Add</el-button>
          <el-button @click="replace2">Replace</el-button>
        </div>
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
let id = 1;
export default {
  name: 'two-list-headerslots',
  display: 'Two list header slot',
  order: 14,
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
      list2: [
        { name: 'Jonny 4', id: 3 },
        { name: 'Guisepe 5', id: 4 },
      ],
    };
  },
  computed: {
    listText1: {
      get() {
        return JSON.stringify(this.list, null, 2);
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
    add: function() {
      this.list.push({ name: 'Juan ' + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: 'Edgard', id: id++ }];
    },
    add2: function() {
      this.list2.push({ name: 'Juan ' + id, id: id++ });
    },
    replace2: function() {
      this.list2 = [{ name: 'Edgard', id: id++ }];
    },
  },
};
</script>
<style scoped></style>

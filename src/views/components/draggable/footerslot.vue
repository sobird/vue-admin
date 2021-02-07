<!--
 - footerslot.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 14:20:57 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <h3>Draggable with footer</h3>

      <draggable
        :componentData="componentData"
        :list="list"
        class="list-group"
        draggable=".item"
        :animation="100"
        @start="dragging = true"
        @end="dragging = false"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item item" :key="element.name">
            {{ element.name }}
          </div>
        </template>

        <template #footer>
          <div
            class="btn-group list-group-item"
            role="group"
            aria-label="Basic example"
            key="footer"
          >
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
  name: 'footerslot',
  display: 'Footer slot',
  order: 12,
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
      dragging: false,
      componentData: {
        props: {
          type: 'transition',
          name: 'flip-list',
        },
      },
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
<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>

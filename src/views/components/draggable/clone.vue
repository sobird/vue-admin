<!--
 - clone.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 11:19:41 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        ghost-class="ghost"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item" :key="element.name">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </el-col>

    <el-col :span="6">
      <h3>Draggable 2</h3>
      <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
        <template #item="{ element }">
          <div class="list-group-item" :key="element.name">
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
export default {
  name: 'clone',
  display: 'Clone',
  order: 2,
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 },
      ],
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
    log: function(evt) {
      window.console.log(evt);
    },
  },
};
</script>
<style scoped></style>

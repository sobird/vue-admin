<!--
 - custom-clone.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 11:28:21 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
    </el-col>

    <el-col :span="6">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list2" :key="element.id">
          {{ element.name }}
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
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "dog 1", id: 1 },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 }
      ],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 }
      ]
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
    cloneDog({ id }) {
      return {
        id: idGlobal++,
        name: `cat ${id}`
      };
    }
  }
};
</script>
<style scoped></style>

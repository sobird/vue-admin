<!--
 - transitions.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 12:14:47 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-button type="primary" @click="sort">
        To original order
      </el-button>
    </el-col>

    <el-col :span="8">
      <h3>Transition</h3>
      <draggable
        class="list-group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <li class="list-group-item" :key="element.order">
            <i
              :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </el-col>

    <el-col :span="8">
      <MonacoEditor v-model="listText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];
export default {
  name: 'transition-example-2',
  display: 'Transitions',
  order: 7,
  components: {
    draggable,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
    };
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    listText: {
      get() {
        return JSON.stringify(this.list, null, 2);
      },
      set() {},
    },
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>

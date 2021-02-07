<!--
 - table.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 12:20:03 created.
-->

<template>
  <el-row>
    <el-col :span="12">
      <h3>Draggable table</h3>

      <table class="el-table el-table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Sport</th>
          </tr>
        </thead>
        <draggable v-model="list" tag="tbody" item-key="name">
          <template #item="{ element }">
            <tr :key="element.name">
              <td scope="row">{{ element.id }}</td>
              <td>{{ element.name }}</td>
              <td>{{ element.sport }}</td>
            </tr>
          </template>
        </draggable>
      </table>
    </el-col>

    <el-col :span="12">
      <MonacoEditor v-model="listText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'table-example',
  display: 'Table',
  order: 8,
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        { id: 1, name: 'Abby', sport: 'basket' },
        { id: 2, name: 'Brooke', sport: 'foot' },
        { id: 3, name: 'Courtenay', sport: 'volley' },
        { id: 4, name: 'David', sport: 'rugby' },
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
};
</script>
<style scoped></style>

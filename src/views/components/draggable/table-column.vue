<!--
 - table-column.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 12:33:41 created.
-->

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <h3>Draggable table</h3>

      <table class="el-table el-table-striped">
        <thead class="thead-dark">
          <draggable v-model="headers" tag="tr">
            <th v-for="header in headers" :key="header" scope="col">
              {{ header }}
            </th>
          </draggable>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.name">
            <td v-for="header in headers" :key="header">{{ item[header] }}</td>
          </tr>
        </tbody>
      </table>
    </el-col>

    <el-col :span="8">
      <h3>List</h3>
      <MonacoEditor v-model="listText" style="height: 400px;" />
    </el-col>

    <el-col :span="8">
      <h3>Headers</h3>
      <MonacoEditor v-model="headersText" style="height: 400px;" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'table-column-example',
  display: 'Table Column',
  order: 9,
  components: {
    draggable,
  },
  data() {
    return {
      headers: ['id', 'name', 'sport'],
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
    headersText: {
      get() {
        return JSON.stringify(this.headers, null, 2);
      },
      set() {},
    },
  },
};
</script>
<style scoped>

</style>

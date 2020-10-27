<!--
 - functional.vue
 - 
 - sobird<i@sobird.me> at 2020/10/27 15:49:37 created.
-->

<template>
  <div class="v-application">
    <v-row>
      <v-col :cols="6">
        <h3>Draggable</h3>
        <draggable
          v-model="rows"
          tag="v-layout"
          class="row wrap fill-height align-center sortable-list"
          style="background: grey;"
        >
          <v-flex
            v-for="row in rows"
            :key="row.index"
            class="sortable"
            xs12
            my-2
            style="background: red"
          >
            <draggable
              :list="row.items"
              tag="v-layout"
              :group="{ name: 'row' }"
              class="row wrap justify-space-around"
            >
              <v-flex v-for="item in row.items" :key="item.title" xs4 pa-3 class="row-v">
                <v-card style="height: 100px;">{{ item.title }}</v-card>
              </v-flex>
            </draggable>
          </v-flex>
        </draggable>
      </v-col>

      <v-col :cols="6">
        <h3>List</h3>
        <MonacoEditor v-model="listText" style="height: 400px;" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);
export default {
  name: 'functional',
  display: 'Functional third party',
  order: 17,
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      rows: [
        {
          index: 1,
          items: [
            {
              title: 'item 1',
            },
          ],
        },
        {
          index: 2,
          items: [
            {
              title: 'item 2',
            },
            {
              title: 'item 3',
            },
          ],
        },
      ],
    };
  },
  computed: {
    listText: {
      get() {
        return JSON.stringify(this.rows, null, 2);
      },
      set() {},
    },
  },
};
</script>
<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

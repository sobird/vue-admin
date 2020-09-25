<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'foo',
    };
  },

  mounted() {
    this.$on('test', function(name) {
      this.name = name;
    });
    this.$emit('test', 'bar');
  },
};
</script>

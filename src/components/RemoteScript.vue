<!--
 - RemoteScript.vue
 - 
 - sobird<i@sobird.me> at 2020/11/17 16:30:57 created.
-->

<script>
export default {
  render: function(createElement) {
    var self = this;
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src,
      },
      on: {
        load: function(event) {
          self.$emit('load', event);
        },
        error: function(event) {
          self.$emit('error', event);
        },
        readystatechange: function(event) {
          if (this.readyState == 'complete') {
            self.$emit('load', event);
          }
        },
      },
    });
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>

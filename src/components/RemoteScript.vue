<!--
 - RemoteScript.vue
 - 
 - sobird<i@sobird.me> at 2020/11/17 16:30:57 created.
-->

<script>
let srcMap = new Map();

export default {
  render: function(createElement) {
    let self = this;
    const src = this.src;

    // 已经加载过的src，禁止再去加载
    if(srcMap.has(src)) {
      this.$nextTick(() => {
        self.$emit('load');
      })
      return null;
    } else {
      srcMap.set(src, true);
    }

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

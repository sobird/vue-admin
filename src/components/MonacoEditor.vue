<!--
 - MonacoEditor.vue
 - 
 - @see https://github.com/FE-Mars/monaco-editor-vue
 - @see https://github.com/egoist/vue-monaco
 - sobird<i@sobird.me> at 2020/10/22 17:28:39 created.
-->

<template>
  <div ref="monaco" class="monaco" style="height: 100%; width: 100%;"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  data() {
    return {};
  },

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: String,
    }
  },

  mounted() {
    this.initMonacoEditor();
  },

  methods: {
    async initMonacoEditor() {
      const { modelValue: content } = this;

      const defaultOptions = {
        language: 'javascript',
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        selectOnLineNumbers: false,
        // 禁用右键菜单
        contextmenu: false,
        theme: 'vs-dark',
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
      };

      let options = Object.assign({}, defaultOptions, this.options);
      options.value = content;

      await this.$nextTick();
      let monacoEditor = monaco.editor.create(this.$refs.monaco, options);
      monacoEditor.onDidChangeModelContent(event => {
        let value = monacoEditor.getValue();

        this.$emit('update:modelValue', value);
        this.$emit('change', value);
      });
      this.monacoEditor = monacoEditor;
    },
  },

  watch: {
    modelValue(n, o) {
      this.monacoEditor && n != o && this.monacoEditor.setValue(n);
    }
  }
};
</script>

<style lang="scss">
.monaco {
  .monaco-editor {
    border-radius: 3px;
  }
  .overflow-guard {
    border-radius: 3px;
  }
  & > .vs {
    border: 1px solid #dcdfe6;
  }
}
</style>

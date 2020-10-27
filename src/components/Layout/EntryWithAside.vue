<!--
 * 整站布局文件
 * 
 * @author  Yang,junlong at 2018-08-08 10:27:32 build.
 * @version $Id$
-->
<template>
  <div
    id="mix"
    :class="['mix', 'mix-with-aside', { 'aside-collapse': $store.state.aside.collapse }]"
  >
    <layout-header>Vue Element Pro</layout-header>

    <div id="body">
      <layout-aside />
      <main id="main" class="main">
        <div class="main-view">
          <router-view
            v-view-title="$route.meta.title"
            :key="$store.state.viewkey"
            class="root-view"
          />
        </div>
        <footer id="footer" class="footer">
          <p>Copyright&nbsp;©&nbsp;{{ new Date().getFullYear() }}&nbsp;</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './LayoutHeader';
import LayoutAside from './LayoutAside';

export default {
  name: 'EntryWithAside',
  components: {
    LayoutHeader,
    LayoutAside,
  },
  data() {
    return {};
  },
  mounted() {
    // todo something
  },
};
</script>

<style lang="scss">
a {
  color: #2c3e50;
  text-decoration: none;
}
*,
:after,
:before {
  box-sizing: inherit;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
  color: #1f2f3d;
}
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

// 整站布局
#mix {
  height: 100%;
  width: 100%;
}

#body {
  height: calc(100% - 48px);

  & > .main {
    height: 100%;
    margin-left: 200px;
    transition: margin 0.3s;
    overflow-y: auto;
    background: #fff;
    .main-view {
      padding: 15px;
    }
  }
}

.footer {
  text-align: right;
  padding: 20px;
  font-size: 12px;
  color: #999;
}

.main-view {
  h1,
  h2,
  h3 {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
}

// 侧边栏折叠时 样式
.aside-collapse {
  .header-brand {
    width: 48px;
    .logo {
      display: inline-block;
    }
    .text {
      display: none;
    }
  }
  #body {
    .aside {
      width: 64px;
    }
    .main {
      margin-left: 64px;
    }
    .hamburger {
      .iconfont {
        transform: rotateZ(-90deg);
      }
    }
  }
}

// el style
.el-form {
  margin-bottom: 10px;
}
.el-row {
  margin-bottom: 10px;
}

.el-date-editor--daterange.el-input__inner {
  width: 250px;
}
.el-input,
.el-select {
  margin-right: 5px;
}

.el-table__header {
  thead {
    th {
      background-color: #f7f7f7;
    }
  }
}

/**
 * Cascader 级联选择器 选择任意一级优化
 * @see https://sobird.me/element-ui-cascader-any-level.htm
 */
.el-cascader-menu {
  .el-radio,
  .el-checkbox {
    display: table;
    vertical-align: middle;
    width: 90%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    margin-left: -20px;
    padding-left: 10px;
  }
  // 隐藏掉单选的radio和多选的checkbox
  .el-radio__inner,
  .el-checkbox__inner {
    display: none;
  }
}
.el-cascader-node {
  padding-left: 10px;
}

.input-item-tip {
  display: block;
  color: #888;
  font-size: 12px;
}
</style>

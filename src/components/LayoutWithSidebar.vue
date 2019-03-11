<!--
 * 整站布局文件
 * 
 * @author  Yang,junlong at 2018-08-08 10:27:32 build.
 * @version $Id$
-->
<template>
  <div id="mix-layout" :class="['mix-layout-has-sidebar', {'sidebar-collapse': $store.state.sidebar.collapse}]">
    <layout-header class="layout-sidebar">Vue Element Pro</layout-header>

    <div id="mix-content" class="mix-layout-content">
      <el-scrollbar ref="contentScrollbar" class="content-scrollbar" wrapClass="scrollbar-wrapper">
        <layout-sidebar />
        
        <div class="main-content">
          <div class="main-view-container">
            <div class="main-view">
              <router-view v-view-title="$route.meta.title" :key="$store.state.viewkey" />
            </div>
          </div>
          <div class="footer">
            <p>Copyright&nbsp;©&nbsp;{{(new Date).getFullYear()}}&nbsp;中台技术部</p>
            <p>Powered by <a href="https://cn.vuejs.org/" target="_blank">Vue</a>. FE</p>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</el-container>
</template>

<script>
  import LayoutHeader from './LayoutHeader';
  import LayoutSidebar from './LayoutSidebar';

  export default {
    name: 'Layout',
    components: {
      LayoutHeader,
      LayoutSidebar
    },
    data() {
      return {
        
      }
    },
    watch: {
      '$route': function(newValue, oldValue) {
        var el = this.$refs['contentScrollbar'].$refs['wrap'];
        el.scrollTop = 0;
      }
    }
  };
</script>

<style lang="scss">
  a {
    color: #2c3e50;
    text-decoration: none;
  }

  ul, ol{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  p{
    margin: 0;
  }

  .pull.left {
    float: left;
  }
  .pull-right{
    float: right;
  }

  .el-dropdown-menu{
    // min-width: 150px;
  }
  
  #mix-layout{
    height: 100%;
    width: 100%;
  }
  
  #mix-content{
    height: calc(100% - 48px);
  }

  .content-scrollbar{
    height: 100%;
  }

  .scrollbar-wrapper{
    overflow-x: auto;
    .el-scrollbar__view {
      height: 100%;
    }
  }

  .main-content{
    height: 100%;
    margin-left: 200px;

    transition: margin .3s;

    .main-view-container{
      min-height: calc(100% - 77px);
      width: 100%;
    }
    .main-view{
      padding: 15px;
    }
  }

  .NotFound .main-content {
    background-color: #fff;
  }

  .footer{
    text-align: right;
    padding: 20px;
    font-size: 13px;
    color: #777;
    p{
      margin: 3px 0;
    }
    a{
      color: #42b983;
    }
  }

  .main-view{
    h1, h2, h3{
      font-weight: normal;
      color: #707478;
      margin: 0;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  // el style
  .el-form{
    margin-bottom: 10px;
  }
  .el-row{
    margin-bottom: 10px;
  }
  
  .el-date-editor--daterange.el-input__inner{
    width: 250px;
  }
  .el-input, .el-select{
    margin-right: 5px;
  }

  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }

  .el-table{
    .cell{
      overflow:hidden; 
      text-overflow:ellipsis; 
      white-space:nowrap; 
    }
    .el-badge sup{
      top: inherit;
    }
    a{
      text-decoration: underline;
      color: #1890ff;
    }
  }
  .el-table__header{
    thead{
      th{
        background-color: #fafafa;
      }
    }
  }

  .badge-status{
    margin-left: 10px;
    .is-dot{
      width: 6px;
      height: 6px;
      left: -18px;
      top: 12px;
    }
  }

  .el-table--small td {
    //padding: 0;
  }

  .el-tag a{
    text-decoration: none;
  }

  .el-card{
    // margin-bottom: 20px;
  }


  // 侧边栏折叠时 样式
  .sidebar-collapse{
    .header-brand{
      width: 48px;
      .mi-logo{
        display: inline-block;
      }
    }
    .mix-sidebar-scrollbar{
      width: 64px;
    }
    .main-content{
      margin-left: 64px;
    }
    .hamburger{
      .fa{
        transform: rotateZ(-90deg);
      }
    }
  }
</style>

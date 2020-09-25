<!--
 - 系统环境切换组件
 - 
 - sobird<i@sobird.me> at 2020/09/21 14:26:39 created.
-->

<template>
  <el-popover placement="bottom-start" popper-class="popper-env" width="100" trigger="hover">
    <ul>
      <li v-for="(item, index) in envs" :key="index">
        <a :href="item.url + '#' + $route.fullPath">{{item.label}}/{{item.value}}</a>
      </li>
    </ul>
    <div class="environment" slot="reference">
      <div class="env-tag" :class="env.value">
        <span class="env-tag-cn">{{env.label}}</span>
        <span class="env-tag-en">{{env.value}}</span>
      </div>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
  </el-popover>
</template>

<script>
const envs = [
  {
    value: 'github',
    label: '线上',
    url: '//yangjunlong.github.io/',
  },
  {
    value: 'dev',
    label: '线下',
    url: '//sobird.me/',
  },
];

export default {
  data() {
    return {
      // 当前环境, 默认为本地开发环境
      env: {
        value: 'local',
        label: '本地环境',
      },

      // 环境列表
      envs: [],
    };
  },
  mounted() {
    const href = window.location.href;

    let _envs = [];
    envs.forEach(item => {
      if (href.indexOf(item.url) > -1) {
        this.env = item;
      } else {
        _envs.push(item);
      }
    });

    this.envs = _envs;
  },
};
</script>

<style lang="scss">
.environment {
  display: inline-block;
  color: #fff;
  line-height: normal;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  & > i {
    color: #aaa;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.24);
    & > i {
      color: #fff;
    }
  }
  .env-tag {
    display: inline-block;
  }
  .env-tag-cn {
    border-radius: 1px 0 0 1px;
    background-color: #e6a23c;
    padding: 0 4px;
  }
  .env-tag-en {
    border-radius: 0 1px 1px 0;
    background: rgba(83, 86, 103, 0.74);
    padding: 0 4px;
  }

  .github {
    .env-tag-cn {
      background-color: #67c23a;
    }
  }
}
.popper-env {
  padding: 0;
  font-size: 12px;
  ul {
    margin: 4px 0;
    padding: 0;

    list-style-type: none;
    li {
      padding: 8px 16px;
      cursor: pointer;
      a {
        display: block;
      }
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

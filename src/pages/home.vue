<template>
  <el-container>
    <el-header>header</el-header>
    <el-container>
      <el-aside>
        <el-menu
          :default-active="defaultActiveMenu"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#ffffff"
          active-text-color="#ffd04b">

          <el-menu-item index="helloWorld">
            <i class="el-icon-s-home"></i>
            <span slot="title">HELLO WORLD</span>
          </el-menu-item>

          <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.path">
            <template slot="title">
              <i :class="item.menuIcon"></i>
              <span>{{item.menuName}}</span>
            </template>

            <el-menu-item-group
              v-for="(item, index) in item.children"
              :key="index">

              <el-menu-item :index="item.path">
                <template>
                  <i :class="item.menuIcon"></i>
                  <span>{{item.menuName}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          menuName: 'demo模块',
          menuIcon: 'el-icon-location',
          path: '/demo-module',
          children: [
            {
              menuName: 'post导出demo',
              menuIcon: 'el-icon-location',
              path: '/postExport'
            }
          ]
        }
      ]
    }
  },
  computed: {
    defaultActiveMenu () {
      let defaultMenuKey = ''

      if (!sessionStorage.getItem('defaultMenuKey')) {
        defaultMenuKey = 'helloWorld'
      } else {
        defaultMenuKey = sessionStorage.getItem('defaultMenuKey')
      }

      return defaultMenuKey
    }
  },
  methods: {
    handleOpen () {},
    handleClose () {},
    handleSelect (index, path) {
      console.log(this.$route.path)
      if (this.$route.path === index) {
        return
      }

      this.$router.push({path: index})

      sessionStorage.setItem('defaultMenuKey', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;

  .el-header {
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .el-aside {
    background: #545c64;
    height: 100%;

    .el-menu {
      border: none;

      .el-menu-item-group {
        .is-active {
          background: #434A50 !important;
        }
      }
    }
  }

  .el-main {
    padding: 10px;
  }
}
</style>

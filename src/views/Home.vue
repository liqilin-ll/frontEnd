<template>
<div>
  <div class="rz-header">
    <div class="header-left">
      <img class="rz-logo" src="../assets/logo.png"/>
      <div class="rz-title">后台管理系统</div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <img class="user-header-img" src="../assets/logo.png">
        <span class="user-name">admin</span>
      </div>
      <div class="header-dropdown">
        <el-dropdown>
          <span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to='/'>退出登录</router-link>
            </el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
  <div style="display:flex">
    <div class="left-side">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          @open="handleMainMenu"
          active-text-color="#ffd04b">
          <el-submenu :index="menu.url" v-for="(menu, index) in menuList">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item :index="childMenu.id" v-for="(childMenu, chileIndex) in menu.childMenuList" @click="handleChildMenu(childMenu.url)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{childMenu.name}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <div class="right-side">
        <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ArrayPropsDefinition } from 'vue/types/options';
import HomeTs from './HomeTs';
import Storage from '@/storage/Storage';
@Component({
    components: {
    },
})
export default class Home extends Vue {
  public storage: Storage = new Storage();
  private isCollapse: boolean = true;
  private leftSideWidth: string = '50px';
  private menuList: any = new Array();
  public constructor() {
      super();
      this.menuList = this.storage.getStorageMenuList();
  }
  // 点击主菜单回调
  public handleMainMenu(url: any){
    if(url){
      this.$router.push(url);
    }
  }
  // 点击子菜单回调
  public handleChildMenu(url: any){
    this.$router.push(url);
  }
}
</script>
<style lang="scss" scoped>
.rz-header{
  height: 100px;
  width: 100%;
  background-image: linear-gradient(160deg, #2600ffd5 20%,#0051ff9f 60%);
  display: flex;
  .header-left{
    display: flex;
    flex:1;
    .rz-logo{
      width: 100px;
    }
    .rz-title{
      font-size: 24px;
      line-height: 100px;
      color: #fff;
      margin-left: 20px;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  }
  .header-right{
    flex: 1;
    .user-info{
      display: block;
      float: right;
      margin-right:100px;
      .user-header-img{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-top: 25px;
      }
      .user-name{
        height: 100px;
        line-height: 100px;
        padding: 0 10px;
        vertical-align: top;
      }
    }
    .header-dropdown{
      position: absolute;
      top: 40px;
      right: 80px;
    }
  }
}
.left-side{
  height: calc(100vh - 100px);
  z-index: 9999;
  text-align: left;
}
.right-side{
  height: calc(100vh - 100px);
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh - 100px);
}
.el-menu--collapse {
    width: 50px;
    height: calc(100vh - 100px);
}
</style>











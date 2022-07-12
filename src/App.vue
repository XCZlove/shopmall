<template>
  <div id="app">
    <keep-alive exclude="Detail">
    <router-view></router-view>
    <h1>哈哈哈</h1>
    </keep-alive>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from './components/content/mainTabbar/Maintabbar'
export default {
  name: 'App',
  components:{
    MainTabbar
  }
}
</script>

<style>
  @import "./assets/css/base.css"
</style>

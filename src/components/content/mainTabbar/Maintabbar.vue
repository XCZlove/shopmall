<template>
      <Tabbar>
      <TabbarItem path="/home">
        <img src="@/assets/img/tabbar/shouye.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/shouye01.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabbarItem>
      <TabbarItem path="/category">
         <img src="@/assets/img/tabbar/gouwu.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/gouwu01.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabbarItem>
      <TabbarItem path="/cart">
         <img src="@/assets/img/tabbar/wode.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/wode01.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabbarItem>
      <TabbarItem path="/profile">
         <img src="@/assets/img/tabbar/fenlei.svg" alt="" slot="item-icon">
        <img src="@/assets/img/tabbar/fenlei01.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabbarItem>
       
    </Tabbar>
</template>

<script>

import Tabbar from '@/components/common/tabbar/Tabbar'
import TabbarItem from '@/components/common/tabbar/TabbarItem'
export default {
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>
  
<style>

</style>
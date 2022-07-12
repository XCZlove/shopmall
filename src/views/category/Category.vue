<template>
  <div class="wrapper">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
     <Scroll class="content1" ref="scroll">
      <cart-list></cart-list>
       </Scroll>
    <!-- 底部汇总 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  components:{
    NavBar,
    CartList,
    CartButtonBar,
    Scroll,
  },
  computed:{
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength',
      'list':'cartList'
    })
  },
   activated(){
      this.$refs.scroll.refresh()
  }

 

  

}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint );
    color: white;
  }
  .wrapper {
    height: 100vh;
  }
  .content1 {
    height: calc(100% - 44px - 45px);
    overflow: hidden;
  }
</style>
<template>
<div id="home">
  <NavBar class="home-nav"> <div slot="center">购物街</div></NavBar>
   <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control" v-show="isTabFixed"/>
  <Scroll class="content"
          ref="scroll" 
          :probe-type="3"
          @scroll="contentClick"
          :pull-up-load="true"
          @pullingUp="loadMore">
    <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <RecommendView :recommends="recommends"/>
    <FeatureView/>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl2"/>
    <GoodList :goods="showGoods"/>
  </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>

 
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/Feature';

import NavBar from '@/components/common/navbar/NavBar';
import TabControl from '@/components/content/tabControl/TabControl'
import GoodList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods} from '@/network/home';
import {itemListenerMixIn} from '@/common/mixin'
export default {
  components:{
    HomeSwiper,
    RecommendView, 
    FeatureView,
    NavBar,
    TabControl,  
    GoodList,
    Scroll,
    BackTop,
  },
  mixins:[itemListenerMixIn],
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemListenr)
  },
  created(){
    //1请求多个数据
  this.getHomeMultidata()
    //2.请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
  //3.监听item中图片加载完成
 
  },
  mounted() {

 
  },


  methods:{
  // 事件监听
  tabClick(index){
    switch(index){
      case 0:
      this.currentType = 'pop'
      break
      case 1:
      this.currentType = 'new'
      break
      case 2:
      this.currentType = 'sell'
      break
    }
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
  },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentClick(position){
      //1.判断backTop是否显示
      this.isShowBackTop = -(position.y) > 1000
      //2.决定tabControl是否吸顶(position:fixed)
    this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
  loadMore(){
    this.getHomeGoods(this.currentType)
    // 重新刷新refresh
    this.$refs.scroll.scroll.refresh()
  },
  swiperImageLoad(){
     //2.获取tabControl的offsetTop
  //所有组件都有一个属性$el:用于获取组建中的元素
  this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  },
  // 网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // this.goods[type].list.push(...res.data.list)
        for(let n of res.data.list) {
          this.goods[type].list.push(n)
        }
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
    })
    },
  
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
    
  }
  
  .content {
    /* height: calc(100% - 89px);
    overflow: hidden;
    margin-top: 44px; */
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom: 40px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
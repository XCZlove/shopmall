<template>
<div id="detail">
  <detail-nar-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nar-bar>
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
     <detail-swiper :top-images="topImages"/>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
     <detail-param-info :paramInfo="paramInfo" ref="params"/>
     <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
     <goods-list :goods="recommends" ref="recommend"/>

  </scroll>
  <detail-bottom-bar @addToCart="addToCart"/>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import DetailNarBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'
// import Toast from '@/components/common/toast/Toast'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail.js'
import {itemListenerMixIn,backTopMixIn} from '@/common/mixin'
import {debounce} from '@/common/utils'

import {mapActions} from 'vuex'


export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // message:'',
      // show:false,

    }
  },
  mixins:[itemListenerMixIn,backTopMixIn],
  components:{
    DetailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    debounce,
    // Toast,
  },

  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求数据
    getDetail(this.iid).then(res => {

      // console.log(res);
      const data = res.result
      //获取顶部图片轮播
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //保存商品详情数据
      this.detailInfo = data.detailInfo
      //获取参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
    },100)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      //获取y值
      const positionY = -position.y
      //[0,3000,4000,6000,8000]
      //和主题中的值做对比
      //positionY在0和3000,index=0
      //positionY在3000和4000,index=1
      //positionY在4000和6000,index=2
      //positionY超过6000,index=3
      let length = this.themeTopYs.length;
      for(let i = 0; i< length - 1; i++){
        //复杂写法
        // if (this.currentIndex!== i && ((i< length - 1 && positionY >= this.themeTopYs[i] && positionY
        //  < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //    this.currentIndex = i
        //    this.$refs.nav.currentIndex = this.currentIndex

        //优化写法hack做法
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] &&
         positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
        }

        //是否显示回到顶部
      this.isShowBackTop = -(position.y) > 1000
      
      },
    addToCart(){
      //获取展示信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //将商品加入购物车
      // this.$store.commit('addCart',product)
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //     this.show = false;
        //     this.message = ''
        // }, 1500);
        this.$toast.show(res,2000)
        // console.log(this.$toast);
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
    }


  },
  mounted(){
 
  },
  destroyed(){
    this.$bus.$on('itemImageLoad', this.itemListenr)

  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
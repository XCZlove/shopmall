<template>
    <Swiper class="detail-swiper">
       <Swiper-Item v-for="item in topImages" :key="item" >
         <img :src="item" alt="">
       </Swiper-Item>
     </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper';
export default {
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  
  },
    components:{
      Swiper,
      SwiperItem,
    }

  
}
</script>
<style lang='css' scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
<template>
   <Swiper>
    <Swiper-Item v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </Swiper-Item>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper';

export default {
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
return {
  isLoad:false
}
  },
    components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if (!this.isLoad) {
      this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>
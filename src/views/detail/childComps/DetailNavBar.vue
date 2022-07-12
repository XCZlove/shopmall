<template>
   <div>
     <nav-bar>
       <div slot="left" class="back" @click="backClick">
         <img src="@/assets/img/common/arrow-left-bold.png" alt="">
       </div>
       <div slot="center" class="title">
       <div v-for="(item, index) in titles" 
                   :key="item.index" 
                   class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">
                   {{item}}
                   </div>
     </div>
     </nav-bar>
   </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
   data () {
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex : 0
      }
   },

   components: {
    NavBar,

   },
   methods:{
     titleClick(index){
       this.currentIndex = index
       this.$emit('titleClick',index)
     },
     backClick(){
       this.$router.back()
     }
   }


}
</script>
<style lang='css' scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: red;
  }
  .back img {
    height: 30px;
    margin-top: 10px;
  }
</style>
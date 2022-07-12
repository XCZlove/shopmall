<template>
   <div class="check-button" :class="{check:isChecked}">
     <img src="@/assets/img/cartgory/select.png" alt="">
   </div>
</template>

<script>
export default {
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
   data () {
      return {

      };
   },

   components: {},

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>
  .check-button  {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-top: 44px;
    border: 2px solid #aaa;
  }
  .check-button img {
    width: 100%;
  }
  .check {
    background-color: red;
    border-color: red;
  }
</style>
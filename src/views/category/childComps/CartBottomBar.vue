<template>
   <div class="bottom-bar">
     <div class="check-content">
     <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
     <span class="panding">全选</span>
    
     </div>
       <div class="i">
       合计:{{totalPrice}}
      </div>
    <div class="calculate" @click="calculateClick">
      去计算:{{checkLength}}
    </div>
   </div>
</template>

<script>
import checkButton from '@/components/content/checkButton/CheckButton'
export default {
   data () {
      return {

      }
   },

   components: {
     checkButton,
   },

   computed: {
     totalPrice(){
       return '¥' +  this.$store.state.cartList.filter(item => {
         return item.checked
       }).reduce((preValue,item) => {
         return preValue + item.price * item.count
       },0).toFixed(2)
     },
     checkLength(){
       return this.$store.state.cartList.filter(item => item.checked).length
     },
     isSelectAll(){
       if (this.$store.state.cartList.length === 0) {
         return false
       }
      // return !(this.cartList.filter(item =>!item.checked).length)
      return !this.$store.state.cartList.find(item => !item.checked)
 
   }
   },
   methods: {
     checkClick(){
       if (this.isSelectAll) {//全部选中
         this.$store.state.cartList.forEach(item => item.checked = false)
       }else {
         this.$store.state.cartList.forEach(item => item.checked = true)
       }
   },
   calculateClick(){
     if (!this.isSelectAll) {
       this.$toast.show('请选择购买的商品',2000)
     }
   }  
}
}
</script>
<style lang='css' scoped>
  .bottom-bar {
    height: 45px;
    background-color: #eee;
    position: relative;
    bottom: 45px;
    display: flex;

  }
  .check-content {
    display: flex;
    margin-left: 10px;
    width: 80px;
  }
  .check-button {
    position: relative;
    right: 0;
    left: 0;
    bottom: 35px;

  }
  .panding,.i{
    padding-top: 10px;
    padding-left: 10px;
  }
  .i {
    flex: 1;
  }
  .calculate {
    width: 110px;
    background-color: red;
    color: white;
    line-height: 45px;
    text-align: center;
  }
</style>
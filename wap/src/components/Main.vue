<template lang="html">
  <div class="main">
    <view-box ref="viewBox" body-padding-top="0px" body-padding-bottom="55px">
      <!-- <x-header :left-options="{backText: '',showBack: false}">{{topTitle}}</x-header> -->
      <router-view/>
      <tabbar>
        <tabbar-item link="/">
            <img @click="sy()" slot="icon" src="./../assets/functions.png">
            <span slot="label">功能</span>
        </tabbar-item>
        <tabbar-item link="/personal">
          <img @click="wd()" slot="icon" src="./../assets/personal.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, XHeader , ViewBox} from 'vux'
export default {
  methods:{
    sy:function(){
      this.topTitle="首页"
    },
    wd:function(){
      this.topTitle="我的"
    }
  },
  // watch:{
  //   '$route'(to,from){
  //     this.topTitle=this.global.topTitle
  //   }
  // },
  // created:function(){
  //   // this.$router.push('/functions')
  //   this.global.topTitle="首页111"
  // },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XHeader,
    ViewBox,
    // Actionsheet,
    // ButtonTab,
    // ButtonTabItem,
  },
  data(){
    return {
      topTitle:this.global.topTitle
    }
  }
}
</script>

<style lang="css">
  .main {
    height: 100%;
    width: 100%;
  }
</style>

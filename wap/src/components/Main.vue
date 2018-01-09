<template lang="html">
  <div class="main">
    <view-box ref="viewBox" body-padding-top="0px" body-padding-bottom="55px">
      <x-header :left-options="{backText: '',showBack: false}">Home</x-header>
      <router-view/>
      <tabbar>
        <tabbar-item link="/functions">
          <img slot="icon" src="./../assets/functions.png">
          <span slot="label">功能</span>
        </tabbar-item>
        <tabbar-item link="/personal">
          <img slot="icon" src="./../assets/personal.png">
          <span slot="label">我的</span>
        </tabbar-item>
        <!-- <tabbar-item show-dot>
          <img slot="icon" src="./assets/personal.png">
          <span slot="label">我的</span>
        </tabbar-item> -->
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, XHeader , ViewBox} from 'vux'
export default {
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
  }
}
</script>

<style lang="css">
  .main {
    height: 100%;
    width: 100%;
  }
</style>

<template>
  <div id="app">
    <!-- <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group> -->

    <view-box ref="viewBox" body-padding-top="0px" body-padding-bottom="55px">
      <x-header :left-options="{backText: '',showBack: false}">Home</x-header>
      <router-view/>
      <tabbar>
        <tabbar-item link="/">
          <img slot="icon" src="./assets/functions.png">
          <span slot="label">功能</span>
        </tabbar-item>
        <tabbar-item link="/personal">
          <img slot="icon" src="./assets/personal.png">
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
  name: 'app',
  // directives: {
  //   TransferDom
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
}
</script>

<style media="screen">
* {margin:0;padding:0}
a:link {text-decoration: none;}

body {
  background-color: #fbf9fe;
}
html, body, #app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

</style>

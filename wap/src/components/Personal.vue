<template>
  <div>
    <group title='Assert'>
      <cell title="Account" value="15061519070"></cell>
      <cell title="Nickname" value="Jonathan"></cell>
      <cell title="Account Type" value="Manager"></cell>
      <cell title="Balance" value="￥ 5441"></cell>
      <cell title="Room Card" value="995"></cell>
      <cell title="Charge" is-link link="/chargeforcards">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/charge2.png">
      </cell>
    </group>

    <group title='Account'>
      <cell title="Logout" is-link></cell>
    </group>
  </div>
</template>



<script>
import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      money: null,
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>

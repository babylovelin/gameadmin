<template>
  <!-- <grid>
    <grid-item label="Grid">
      <img slot="icon" src="../assets/functions.png">
      <span slot="label">Charge</span>
    </grid-item>
    <grid-item label="Grid">
      <img slot="icon" src="../assets/functions.png">
      <span slot="label">Charge</span>
    </grid-item>
    <grid-item label="Grid">
      <img slot="icon" src="../assets/functions.png">
      <span slot="label">Charge</span>
    </grid-item>
  </grid> -->

  <grid>
    <grid-item link="/playercharge">
      <img slot="icon" src="../assets/charge.png">
      <span slot="label">Player Charge</span>
    </grid-item>
    <grid-item link="/">
      <img slot="icon" src="../assets/charge.png" style="visibility:hidden">
      <span slot="label" style="visibility:hidden">Player Charge</span>
    </grid-item>
    <grid-item link="/">
      <img slot="icon" src="../assets/charge.png" style="visibility:hidden">
      <span slot="label" style="visibility:hidden">Player Charge</span>
    </grid-item>
  </grid>

</template>

<script>
import { Grid, GridItem, GroupTitle } from 'vux'
export default {
  name: 'Functions',
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // }
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

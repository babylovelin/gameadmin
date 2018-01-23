<template>
  <div id="app">
    <!-- <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group> -->

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'

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

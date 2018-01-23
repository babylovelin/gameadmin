<template lang="html">
  <div class="playerrecorditem vux-1px-b">
    <span class="left">{{ celltime}}</span>
    <span class="mid">{{cellcny}}</span>
    <span class="right">{{cellval}}</span>
  </div>
</template>

<script>
export default {
  props:['cellcny','cellval','celltime']
}
</script>

<style lang="less">
@import '../common/less/variable.less';
@import '~vux/src/styles/1px.less';
.playerrecorditem{
  width: 100%;
  .h(44);
  margin: 0 auto;
  span{
    display: inline-block;
    .fs(16);
    .l-h(44);
    // text-align: center;
  }
  .left{
    float: left;
    .m-l(5);
    .w(160);
  }
  .mid{
    float: left;
    // .m-l(30);
    .w(80);
  }
  .right{
    float: right;
    // color: #999;
    .w(85);
    .m-r(5);
  }
}


</style>

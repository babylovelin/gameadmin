<template lang="html">
  <div class="playerrecorditem vux-1px-b">
    <span class="left">{{cellname}}</span>
    <span class="mid">{{celltime}}</span>
    <span class="right">{{cellval}}</span>
  </div>
</template>

<script>
export default {
  props:['cellname','cellval','celltime']
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
    .w(100);
  }
  .mid{
    float: left;
    // .m-l(30);
    .w(145);
  }
  .right{
    float: right;
    // color: #999;
    .w(85);
    .m-r(5);
  }
}


</style>

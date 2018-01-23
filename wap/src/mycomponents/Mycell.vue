<template lang="html">
  <div class="mycell vux-1px-b">
    <span class="left">{{cellname}}</span> <span class="right">{{cellval}}</span>
  </div>
</template>

<script>
export default {
  props:['cellname','cellval']
}
</script>

<style lang="less">
@import '../common/less/variable.less';
@import '~vux/src/styles/1px.less';
.mycell{
  width: 92%;
  .h(44);
  margin: 0 auto;
  span{
    display: inline-block;
    .fs(16);
    .l-h(44);
  }
  .left{
    float: left;
  }
  .right{
    float: right;
    color: #999;
  }
}


</style>

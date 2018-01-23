<template lang="html">
  <div class="playerrecord">
    <div class="title">
      <proxy-item :cellcny='"充值人民币"' :celltime='"充值时间"' :cellval='"充值房卡数"'></proxy-item>
    </div>
    <div class="record">
      <divider>{{dividerData}}</divider>
      <proxy-item v-for="item in recordData" :cellcny='item.cny' :celltime='item.time' :cellval='item.roomcard'></proxy-item>
      <!-- <player-item v-for="item in recordData" :cellname='item.userid' :celltime='item.time' :cellval='item.roomcard'></player-item> -->
    </div>
  </div>
</template>

<script>
import { Divider } from 'vux'
import ProxyItem from '../mycomponents/ProxyRecordItem.vue'
export default {
  data(){
    return{
      recordData:[],
      dividerData:'暂无充值记录'
    }
  },
  components:{
    ProxyItem,
    Divider
  },
  mounted:function(){
    var params = new URLSearchParams()
    params.append('num', 20)
    var that =this
    this.$http.post('user/searchProxyChargeForSelfRecord',params)
    .then((ret)=>{
      that.recordData = ret.data
      // console.log(ret);
      if (ret.data!='') {
        that.dividerData="显示最新20条充值记录"
      }

    })
  }
}
</script>

<style lang="less">
@import '../common/less/variable.less';
*{
  .fs(12);
}
.playerrecord{
  height: 100%;
  overflow: scroll;
  .title{
    position: fixed;
    left: 0;
    top: 0;
    background: white;
    width: 100%;
    z-index: 999;
  }
  .record{
    .m-t(44);
    width: 100%;
  }
}
</style>

<template lang="html">
  <div class="playerrecord">
    <div class="title">
      <player-item :cellname='"代理手机号"' :celltime='"充值时间"' :cellval='"充值房卡数"'></player-item>
    </div>
    <div class="record">
      <divider>{{dividerData}}</divider>
      <player-item v-for="item in recordData" :cellname='item.userid' :celltime='item.time' :cellval='item.roomcard'></player-item>
      <!-- <player-item v-for="item in recordData" :cellname='item.userid' :celltime='item.time' :cellval='item.roomcard'></player-item> -->
    </div>
  </div>
</template>

<script>
import { Divider } from 'vux'
import PlayerItem from '../mycomponents/PlayerRecoedItem.vue'
export default {
  data(){
    return{
      recordData:[],
      dividerData:'暂无充值记录'
    }
  },
  components:{
    PlayerItem,
    Divider
  },
  mounted:function(){
    var params = new URLSearchParams()
    params.append('num', 20)
    this.$http.post('user/searchplayerrecord',params)
    .then((ret)=>{
      this.recordData = ret.data
      if (ret.data!='') {
        this.dividerData="显示最新20条充值记录"
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

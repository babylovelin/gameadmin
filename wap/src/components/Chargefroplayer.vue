<template lang="html">
  <div class="chargeforplayer">
    <group>
      <x-input v-model="cardnum" title="房卡数" placeholder="请输入充值数量" novalidate :show-clear="true"placeholder-align="right"></x-input>
    </group>
    <div style="padding:15px;">
      <div class="" @click="chargeforplayer()">
        <x-button type="primary">确认充值</x-button>
      </div>
    </div>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, FormPreview, Alert } from 'vux'
export default {
  data(){
    return {
      cardnum:'',
      title:'',
      show:false,
      message:'',
      try: false
    }
  },
  components:{
    XInput,
    XButton,
    Alert,
    Group
  },
  methods:{
    chargeforplayer:function(){
      if(this.try){
        return
      }
      this.try = !this.try
      if (parseInt(this.cardnum)<=0) {
        this.show=true;
        this.message='请输入正确的房卡数'
        this.try = !this.try
        return
      }
      if(this.cardnum ==''){
        this.show=true;
        this.message='请输入要充值的房卡数'
        this.try = !this.try
        return
      }
      var params = new URLSearchParams()
      params.append('userid', this.$route.params.chargecardnum)
      params.append('roomcardnum', this.cardnum)
      var that  =this
      this.$http.post('user/chargeRoomcard',params)
      .then((ret)=>{
        that.try = !that.try
        if (ret.data.err==-999) {
          that.show=true;
          that.message='请先登录'
          setTimeout(()=>{that.$router.push('/login')},2000)
          return
        }
        if (ret.data.err==0) {
          that.show=true;
          that.message='用户房卡充值完成'
          setTimeout(()=>{that.$router.push('/')},2000)
          return
        }
        if (ret.data.err==-1) {
          that.show=true;
          that.message='用户id错误'
          setTimeout(()=>{that.$router.push('/playercharge')},1000)
          return
        }
        if (ret.data.err==-2) {
          that.show=true;
          that.message='用户房卡充值失败'
          return
        }
        if (ret.data.err==-3) {
          that.show=true;
          that.message='您的剩余房卡数不足，请及时充值'
          return
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>

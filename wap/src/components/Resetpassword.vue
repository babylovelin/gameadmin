<template lang="html">
  <div class="resetpassword">
    <group>
      <x-input v-model="account" title="手机号" placeholder="请输入代理手机号" novalidate :show-clear="true"placeholder-align="right"></x-input>
    </group>
    <div style="padding:15px;">
      <div class="" @click="chargeforplayer()">
        <x-button type="primary">确认重置</x-button>
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
      account:'',
      title:'',
      show:false,
      message:''
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
      if(this.account ==''){
        this.show=true;
        this.message='请输入要修改的代理手机号'
        return
      }
      var params = new URLSearchParams()
      params.append('username', this.account)
      console.log(this.account);
      this.$http.post('user/resetpassword',params)
      .then((ret)=>{
        if(ret.data.err==-999){
          this.show=true;
          this.message='请先登录'
          setTimeout(()=>{this.$router.push('/login')},2000)
          return
        }
        if(ret.data.err==0){
          this.show=true;
          this.message='密码已被重置为admin'
          return
        }
        if(ret.data.err==-1){
          this.show=true;
          this.message='手机号输入不正确'
          return
        }
        if(ret.data.err==-2){
          this.show=true;
          this.message='密码重置失败'
          return
        }
        if(ret.data.err==-3){
          this.show=true;
          this.message='您不是超管哦！'
          return
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>

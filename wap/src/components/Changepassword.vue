<template lang="html">
  <div class="resetpassword">
    <group>
      <x-input type='password' v-model="oldpass" title="原始密码" placeholder="请输入原始密码" novalidate :show-clear="true"placeholder-align="right"></x-input>
      <x-input type='password' v-model="newpass" title="新密码" placeholder="请输入新密码" novalidate :show-clear="true"placeholder-align="right"></x-input>
      <x-input type='password' v-model="repass" title="确认密码" placeholder="请输入确认密码" novalidate :show-clear="true"placeholder-align="right"></x-input>
    </group>
    <div style="padding:15px;">
      <div class="" @click="changepassword()">
        <x-button type="primary">确认修改</x-button>
      </div>
    </div>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, FormPreview, Alert } from 'vux'
import md5 from 'js-md5';
export default {
  data(){
    return {
      oldpass:'',
      newpass:'',
      repass:'',
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
    changepassword:function(){
      if(this.oldpass ==''||this.newpass==''||this.repass==''){
        this.show=true;
        this.message='输入不能为空'
        return
      }
      if (this.newpass!=this.repass) {
        this.show=true;
        this.message='两次密码输入不一致'
        return
      }
      var params = new URLSearchParams()
      params.append('username', localStorage.username)
      params.append('oldpass', md5(this.oldpass))
      params.append('newpass', md5(this.newpass))
      this.$http.post('user/changepassword',params)
      .then((ret)=>{
        if(ret.data.err==-999){
          this.show=true;
          this.message='请先登录'
          setTimeout(()=>{this.$router.push('/login')},2000)
          return
        }
        if(ret.data.err==0){
          this.show=true;
          this.message='密码修改完成,请重新登录！'

          setTimeout(()=>{this.logout()},2000)
          return
        }
        if(ret.data.err==-1){
          this.show=true;
          this.message='手机号未找到'
          return
        }
        if(ret.data.err==-2){
          this.show=true;
          this.message='原始密码不正确，或联系超管重置密码'
          return
        }
        if(ret.data.err==-3){
          this.show=true;
          this.message='密码修改失败'
          return
        }
      })
    },
    logout() {
      localStorage.removeItem('username');
      this.$http.post('/logout')
      .then((ret)=>{
        this.$router.push('/login')
      })

    }
  }
}
</script>

<style lang="css">
</style>

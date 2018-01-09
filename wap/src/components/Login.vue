<template lang="html">
  <div class="login">
    <div class="title">
      登录
    </div>
    <div class="username vux-1px-b">
      <span><i class="fa fa-user " aria-hidden="true"></i></span> <input type="text" name="" v-model='username' placeholder="请输入帐号">
    </div>
    <div class="password vux-1px-b">
      <span><i class="fa fa-lock" aria-hidden="true"></i></span> <input type="password" name="" v-model='password' placeholder="请输入密码">
    </div>
    <div class="register-btn">
      <span @click="login()">
        登录
      </span>
      <div class="tipregister" @click="jumptoregister">
          <b >注册</b>
      </div>
      <div class="tippass" @click="jumptoforget">
          <b >忘记密码</b>
      </div>
    </div>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>

<script>
import { Alert } from 'vux'
import md5 from 'js-md5';
export default {
  data(){
    return {
      username: '',
      password: '',
      message: '',
      show: false,
      title: '',
    }
  },
  components:{
    Alert
  },
  methods:{
    jumptomain:function(){
      this.$router.push('/')
    },
    jumptoforget:function(){
      this.show=true
      this.message='请联系管理员进行修改'
    },
    jumptoregister:function(){
      this.$router.push('/register')
    },
    login:function(){
      var params = new URLSearchParams()
      params.append('username',this.username)
      params.append('password',md5(this.password))
      var that = this
      this.$http.post('user/login',params)
      .then((res)=>{
        if(res.data.err==0){
          that.show=true
          that.message ="登录成功！"
          document.cookie="username="+that.username
          setTimeout(()=>{that.$router.push('/functions'),1500})

        }
        if(res.data.err==-1){
          that.show=true
          that.message ="用户名或密码错误"
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../common/less/variable.less';
@import '~vux/src/styles/1px.less';
.login {
  .title {
    width: 100%;
    .fs(20);
    text-align: center;
    .p-t(10);
    .p-b(10);
  }
  .username,.password{
    width: 85%;
    margin: 0 auto;
    .h(60);
    .l-h(60);
    input{
      border: none;
      background: transparent;
      .w(250);
      .fs(16);
      display: inline-block;
      .m-l(15);
    }
    span {
      i{
        .fs(30);
        .l-h(80);
        color: #3FB0E3;
      }
    }
  }
  .register-btn{
    position: relative;
    span{
      color: #fff;
      background: #3FB0E3;
      display: block;
      width: 70%;
      .h(35);
      .l-h(35);
      .fs(16);
      margin: 0 auto;
      text-align: center;
      .m-t(80);
      border-radius: 3px;
    }
    .tipregister{
      position: absolute;
      width: 30%;
      .left(60);
      .fs(14);
      .top(50);
      color: #3FB0E3;
    }
    .tippass{
      position: absolute;
      width: 30%;
      .right(0);
      .fs(14);
      .top(50);
      color: #3FB0E3;
    }
  }
}
</style>

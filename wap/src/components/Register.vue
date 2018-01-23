<template lang="html">
  <div class="register">
    <div class="title">
      注册
    </div>
    <div class="username vux-1px-b">
      <span><i class="fa fa-user " aria-hidden="true"></i></span> <input v-model="username" type="number" name="" value="" placeholder="请输入手机号">
    </div>
    <div class="password vux-1px-b">
      <span><i class="fa fa-lock" aria-hidden="true"></i></span> <input v-model="password" type="password" name="" maxlength="18"  value=""placeholder="请输入密码(6-18位)">
    </div>
    <div class="password vux-1px-b">
      <span><i class="fa fa-lock" aria-hidden="true"></i></span> <input v-model="repass" type="password" name="" maxlength="18" value=""placeholder="请重复输入密码">
    </div>
    <div class="register-btn">
      <span @click="userRegist()">注册
      </span>
      <div class="tip" @click="jumptologin()">
        <b>已有帐号？点击登录</b>
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
      repass:''
    }
  },
  components:{
    Alert
  },
  methods:{
    jumptologin:function(){
      this.$router.push('/login')
    },
    userRegist:function(){
      if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.username))){
        this.show=true
        this.message='请输入正确的手机号'
        return false;
      }

      if(this.password==''||this.username==''){
        this.show=true
        this.message='帐号/密码不能为空'
        return
      }
      if (this.password.length < 6 || this.password.length > 18) {
        this.show=true
        this.message='密码长度为6-18位'
        return
      }
      if(this.password!=this.repass){
        this.show=true
        this.message='两次密码不一致'
        return
      }

      var params = new URLSearchParams()
      params.append('username',this.username)
      params.append('password',md5(this.password))
      var that=this
      this.$http.post('newUser',params)

      .then((res)=>{

        if(res.data.err==0){
          that.show=true
          that.message='注册成功，请登录'
          setTimeout(()=>{that.$router.push('/login')},3000)

        }if (res.data.err==-1) {
          that.show=true
          that.message='用户名已存在'
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../common/less/variable.less';
@import '~vux/src/styles/1px.less';
.register {
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
      // border: 1px solid #C7C7C7;
      .m-t(80);
      border-radius: 3px;
    }
    .tip{
      position: absolute;
      .left(60);
      width: 100%;
      .fs(14);
      .top(50);
      color: #3FB0E3;
    }
  }
}
</style>

<template>
  <div>
    <mycell :cellname='"用户名"' :cellval='username'></mycell>
    <mycell :cellname='"用户类型"' :cellval='usertype'></mycell>
    <mycell :cellname='"房卡数"' :cellval='roomcardnum'></mycell>
    <group title=''>
      <!-- <cell title="Account" value=name></cell>
      <cell title="Nickname" value=""></cell>
      <cell title="Account Type" value=""></cell>
      <cell title="Balance" value=""></cell>
      <cell title="Room Card" value=""></cell> -->
      <cell title="充值" is-link link="/chargeforcards">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/charge2.png">
      </cell>

        <!-- <cell title="重置用户密码" is-link link="/resetpassword"></cell> -->
        <cell title="充值记录"  is-link link="/proxyrecord"></cell>


        <cell title="修改密码"  is-link link="/changepassword"></cell>

        <cell title="退出登录" @click.native="logout()" is-link></cell>

    </group>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>



<script>
import { Cell, CellBox, CellFormPreview, Group, Badge, Alert} from 'vux'
import Mycell from '@/mycomponents/Mycell'
export default {
  mounted () {
    // setTimeout(() => {
    //   this.money = -1024
    // }, 2000)

    if(!localStorage.username){
      this.$router.push('/login')
      return
    }
    this.checkUser()
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge,
    Mycell,
    Alert
  },
  methods: {
    onClick () {
      console.log('on click')
    },
    checkUser:function(){
      if(!localStorage.username){
        this.show=true
        this.message ="请登录"
        this.$router.push('/login')
        return
      }else {
        var params = new URLSearchParams()
        params.append('username', localStorage.username)
        var that = this
        this.$http.post('user/getUserInfo',params)
        .then((ret)=>{
          that.username=ret.data.re.username
          // that.usertype=ret.data.re.super
          if (ret.data.re.super==0) {
            that.usertype='代理'
          }
          if (ret.data.re.super==1) {
            that.usertype='超管'
          }
          that.roomcardnum=ret.data.re.roomcard
        })
      }

    },
    logout() {
      localStorage.removeItem('username');
      this.$http.post('/logout')
      .then((ret)=>{
        this.$router.push('/login')
      })

    }
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      show:false,
      title:'',
      message:'',
      money: null,
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false,
      username:'',
      usertype:'',
      roomcardnum:''

    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>

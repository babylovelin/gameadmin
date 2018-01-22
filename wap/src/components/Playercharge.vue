<template>
  <div>
    <form-preview header-label="玩家信息" header-value="" :body-items="list" :footer-buttons="buttons"></form-preview>
    <group>
      <x-input v-model="searchID" title="ID" placeholder="请输入玩家ID" novalidate :show-clear="true"placeholder-align="right"></x-input>
    </group>
    <div style="padding:15px;">
      <div class="" @click="checkUser()">
        <x-button type="primary"> 查询玩家信息</x-button>
      </div>
    </div>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, FormPreview, Alert } from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    FormPreview,
    Alert
  },
  data () {
    return {
      show: false,
      message: '',
      title:'操作提示',
      searchID:'',
      playerID:'',
      list:[
        {
          label: 'ID',
          value: ''
        },{
        label: '名称',
        value: ''
      }, {
        label: '房卡数',
        value: ''
      }],
      buttons:[{
        style:'primary',
        text:'为该玩家充值',
        onButtonClick: (name) => {
          if(this.playerID == ''){
            this.show=true
            this.message ="请输入玩家ID"
            return
          }
          //跳转到给玩家冲房卡的界面
          this.$router.push('/chargeforplayer/'+this.playerID)

        }
      }]
    }
  },
  methods:{
    checkUser:function(){
      if(this.searchID == ''){
        this.show=true
        this.message ="请输入玩家ID"
        return
      }
      var params = new URLSearchParams()
      params.append('userid', this.searchID)
      var that = this
      this.$http.post('user/checkUser',params)
      .then((ret)=>{
        console.log(ret);
        if(ret.data.err==-1){ //没有这个id
          that.show=true
          that.message ="请输入正确的ID"
          return
        }
        if (ret.data.err==-2) {//参数错误
          that.show=true
          that.message ="请输入正确的ID"
          return
        }
        if (ret.data.err==-999) {
          that.show=true
          that.message ="请先登录！"
          setTimeout(()=>{that.$router.push('/login')},2000)
          return
        }
        that.playerID = ret.data.res[0].userid
        that.list[0].value=ret.data.res[0].userid
        that.list[1].value=ret.data.res[0].name
        that.list[2].value=ret.data.res[0].gems
      })
    }
  }
}
</script>
<style lang='less'>
@import '../common/less/variable.less';
*{.fs(16)}
</style>

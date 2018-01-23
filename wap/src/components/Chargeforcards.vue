<template>
  <div>
    <group  label-width="5em">
      <popup-picker title="套餐类型"
      :data="list1"
      v-model="value1"
      @on-show="onShow"
      @on-hide="onHide"
      @on-change="onChange"
      placeholder="请选择套餐"></popup-picker>
      </popup-picker>
    </group>
    <div style="padding:15px;">
      <div class="" @click="wxpay()">
        <x-button type="primary">微信支付</x-button>
      </div>
      <!-- {{returndata}} -->
    </div>
    <alert v-model="show" :title="title"> {{ message }}</alert>
  </div>
</template>

<script>
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch, Alert } from 'vux'
// import axios from 'axios'
export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch,
    Alert
  },
  mounted:function(){
    if(!getQueryString("code")){
      location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxedf69f9306bc876a&redirect_uri=http%3a%2f%2fdealer.870yx.com%2fchargeforcards&response_type=code&scope=snsapi_base&state=123#wechat_redirect'

    }
  },
  data () {
    return {
      list1: [[
        '500元 3300张',
        '1000元 7000张',
        '2000元 15000张'
      ]],
      value1: [],
      message: '',
      show: false,
      title: '',
      returndata:'',
      code:'code',
      res:'res',
      totalfee:0,
      try:false
    }
  },
  methods: {
    onChange (val) {
      console.log('val change', val)
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    wxpay:function(){
      //先选择套餐
      if (this.value1=='') {
        this.show=true
        this.message='请先选择套餐'
        return
      }
      if(this.try){
        return
      }
      //获取code
      if(!getQueryString("code")){
        location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxedf69f9306bc876a&redirect_uri=http%3a%2f%2fdealer.870yx.com%2fchargeforcards&response_type=code&scope=snsapi_base&state=123#wechat_redirect'

      }else {
        // 添加请求参数
        // this.show=true
        // this.message=this.value1[0].substring(0,4)
        // return
        if (parseInt(this.value1[0]) == 500) {
          this.totalfee = 50000

        }
        else if (parseInt(this.value1[0]) == 1000) {
          this.totalfee = 100000

        }
        else if (parseInt(this.value1[0]) == 2000) {
          this.totalfee = 200000

        }else {
          this.show=true
          this.message='您的输入有误'
          return
        }
        this.try=!this.try
        var params = new URLSearchParams()
        params.append('code',getQueryString("code"))
        params.append('fee',this.totalfee)
        // params.append('fee',1)
        var that = this
        //请求后端获取accesstoken
        this.$http.post('user/getToken',params)
        .then((res)=>{
          that.try=!that.try
          var appId = res.data.appId
          var timeStamp = res.data.timeStamp
          var nonceStr = res.data.nonceStr
          var mypackage = res.data.package
          var signType = res.data.signType
          var sign = res.data.sign

          function onBridgeReady(){
             WeixinJSBridge.invoke(
             'getBrandWCPayRequest', {
              "appId":appId, //公众号名称，由商户传入
              "timeStamp":timeStamp,//时间戳，自1970年以来的秒数
              "nonceStr":nonceStr, //随机串
              "package":mypackage,
              "signType":signType,  //微信签名方式：
              "paySign":sign//微信签名
             },
             function(res){
              // if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                window.location.href='/personal'
              // } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
             }
             );
             // window.location.href='/personal'
            }
            if (typeof WeixinJSBridge == "undefined"){
             if( document.addEventListener ){
             document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
             }else if (document.attachEvent){
             document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
             }
            }else{
             onBridgeReady();
            }
        })
      }
    }
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%


</script>

<style lang="less">
@import '../common/less/variable.less';
.picker-buttons {
  margin: 0 15px;
}
*{
  .fs(12)
}
</style>

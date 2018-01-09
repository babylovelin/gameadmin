<template>
  <div>
    <form-preview header-label="playerID" header-value="244158" :body-items="list" :footer-buttons="buttons"></form-preview>
    <group>
      <x-input v-model="searchID" title="Player ID" placeholder="Please input Player ID here" novalidate :show-clear="true"placeholder-align="right"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary"> check</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, FormPreview } from 'vux'
export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    FormPreview
  },
  data () {
    return {
      searchID:'111',
      playerID:'244158',
      list:[{
        label: 'Nickname',
        value: 'Jonathan'
      }, {
        label: 'Room Cards',
        value: '56'
      }],
      buttons:[{
        style:'primary',
        text:'Charge for him',
        onButtonClick: (name) => {
          alert(`clicking ${name}`)
        }
      }]
    }
  }
}
</script>
<style lang='less'>
@import '../common/less/variable.less';
*{.fs(16)}
</style>

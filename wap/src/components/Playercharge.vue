<template>
  <div>
    <form-preview header-label="Player ID" header-value="244158" :body-items="list" :footer-buttons="buttons"></form-preview>
    <group>
      <x-input title="Player ID" placeholder="Please input Player ID here" novalidate :show-clear="true"placeholder-align="right"></x-input>
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

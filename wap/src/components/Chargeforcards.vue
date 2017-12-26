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
      <x-button type="primary">微信支付</x-button>
    </div>
  </div>
</template>

<script>
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch } from 'vux'

export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch
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
    }
  },
  data () {
    return {
      list1: [[
        '套餐一 500元 3300张',
        '套餐二 1000元 7000张',
        '套餐三 2000元 15000张'
      ]],
      value1: [],
    }
  }
}
</script>

<style scoped>
.picker-buttons {
  margin: 0 15px;
}
</style>

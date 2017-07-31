<template>
  <div class="call">
    <a @click.stop.prevent="counter">Call me</a>
  </div>
</template>

<script>
export default {
  name: 'call',
  data () {
    return {
      phone: '13117617863'
    }
  },
  methods: {
    counter: function () {
      let me = this
      window.alert('是否确认拨打此电话：' + me.phone)
      window.location.href = 'tel://' + me.phone
    }
  }
}
</script>

<style scoped>

</style>

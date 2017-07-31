<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <router-link v-for="(link, key, index) in links" :to="link" :key="index">Go to {{ key }}</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      links: {
        index: '/',
        member: '/member',
        test: '/test',
        call: '/call',
        components: '/components'
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}
img {
  width: 4rem;
}
nav>a {
  display: inline-block;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.5rem;
}
</style>

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <router-link
        v-for="(link, key, index) in links"
        :key="index"
        :to="link"
      >
        Go to {{ key }}
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: {
        index: '/',
        member: '/member',
        test: '/test',
        call: '/call',
        components: '/components',
        advanced: '/advanced',
      },
    };
  },
};
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

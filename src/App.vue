<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/yeah-215x215.png">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  padding-top: 60px;
  padding-bottom: 60px;
}

body {
  max-width: 700px;
  margin: 0 auto;
  background-color: black;
}
</style>

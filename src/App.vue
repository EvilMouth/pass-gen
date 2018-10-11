<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/yeah-215x215.png">
    <password-generator/>
  </div>
</template>

<script>
import PasswordGenerator from './components/PasswordGenerator.vue'

export default {
  name: 'app',
  components: {
    PasswordGenerator
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: black;
  padding-top: 60px;
  padding-bottom: 60px;
  height: -webkit-fill-available;
}
body {
  margin: 0px;
}
</style>

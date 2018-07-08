<template>
  <div id="app">
    <customheader></customheader>
  </div>
</template>
<script>
import Customheader from './components/header/header.vue'
export default {
  name: 'app',
  components: {
    Customheader
  }
} 
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
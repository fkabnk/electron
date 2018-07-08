
<style lang="scss">
    @import '../../styles/header.scss';
</style>
<template>
    <b-container class="customHeader">
        <b-row class="headerRow">
            <b-col><img class="logo" src="../../../resources/logopro.png"/></b-col>
            <b-col>2</b-col>
        </b-row>
    </b-container>
</template>
<script>
import Vue from "vue";
import {Layout} from "bootstrap-vue/es/components"  ;

Vue.use(Layout);

export default {
  name: 'customHeader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

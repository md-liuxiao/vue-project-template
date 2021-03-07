<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './styles/global.css';
@import './styles/element.scss';
@import './styles/editor.css';

#app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  width: 100%;
  background-color: #f3f3f3;
}
* {
  padding: 0;
  margin: 0;
}
.claerfix::after {
  content: "";
  display: block;
  clear: both;
  width: 100%;
}
.w1170 {
  width: 1170px;
  margin: 0 auto;
}
li {
  list-style: none;
}
</style>

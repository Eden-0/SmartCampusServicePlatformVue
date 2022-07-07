<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getCookie} from "@/util/cookie";

export default {
  name: "app",
  created() {
    this.$router.push('/')
  }
}
</script>

<style scoped>

</style>

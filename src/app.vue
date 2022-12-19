<template>
  <router-view :key="$route.fullPath"/>
</template>

<script>
export default {
  name: "app"
}
</script>

<style src="./styles.css"></style>
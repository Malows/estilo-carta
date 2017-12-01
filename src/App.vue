<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <carta></carta>
  </div>
</template>

<script>
/*
* Root component
*/
export default {
  components: {
    'carta': () => System.import('./components/Carta.vue')
  }
}
</script>

<style></style>

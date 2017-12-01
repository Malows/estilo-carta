<template lang="html">
  <div class="has-text-centered">
    <h3 v-show="platos.length">{{this.categoria.nombre.toUpperCase()}}</h3>
    <div class="columns is-gapless is-multiline is-mobile">
      <plato v-for="plato in platos" :plato="plato" :key="plato.id" class="is-fullwidth"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'plato': () => System.import('./Plato.vue')
  },
  props: ['categoria'],
  computed: {
    platos () {
      return this.categoria.platos.filter(plato => plato.habilitado)
    }
  }
}
</script>

<style lang="css">
h3 {
  font-size: 2.5rem;
}
</style>

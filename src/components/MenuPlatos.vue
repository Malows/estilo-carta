<template lang="pug">
  .has-text-centered(v-if="shouldShow")
    h3 {{ categoria.nombre }}
    .columns.is-gapless.is-multiline.is-mobile
      plato.is-fullwidth(v-for="plato in categoria.platos" :plato="plato" :key="plato.id")
</template>

<script>
import Plato from './Plato'

export default {
  name: 'menu-platos',
  components: {
    Plato
  },
  props: ['categoria'],
  computed: {
    shouldShow () {
      if (!this.categoria.platos) return false
      else return this.categoria.platos.filter(x => x.habilitado).length !== 0
    }
  }
}
</script>

<style lang="css">
h3 {
  font-size: 3rem;
  text-transform: uppercase;
}
</style>

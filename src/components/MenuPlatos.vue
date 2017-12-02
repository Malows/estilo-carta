<template lang="pug">
  .has-text-centered
    h3(v-show="categoria.platos.length") {{ categoria.nombre }}
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
  props: ['categoria']
  // computed: {
  //   platos: () => this.categoria.platos.filter(x => x.habilitado)
  // }
}
</script>

<style lang="css">
h3 {
  font-size: 3rem;
  text-transform: uppercase;
}
</style>

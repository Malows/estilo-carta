<template lang="pug">
  .layout-view
    .column.is-gapless.is-fullwidth.is-10-desktop.is-offset-1-desktop.is-8-widescreen.is-offset-2-widescreen
      menu-platos(v-for="categoria in categorias" :categoria='categoria' :key='categoria.id' v-show="categoria.platos.length")
</template>

<script>
import 'bulma/css/bulma.css'
import { mapState } from 'vuex'
import MenuPlatos from './MenuPlatos'

export default {
  name: 'carta',
  components: {
    MenuPlatos
  },
  data () {
    return {
      address: ''
    }
  },
  computed: {
    ...mapState(['categorias'])
  },
  mounted () {
    this.$store.dispatch('refreshCategorias')
  }
}
</script>

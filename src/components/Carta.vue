<template lang="html">
  <div class="layout-view">
    <div class="column is-gapless is-fullwidth is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
      <menu-platos v-for="categoria in categorias" :categoria='categoria' :key='categoria.id' />
    </div>
    <input type="text" class="input" v-model="address">
    <button class="button" @click="displayServerDialog">Servidor</button>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import { mapState } from 'vuex'
import { URL } from '../api'

export default {
  data () {
    return {
      address: ''
    }
  },
  components: {
    'menu-platos': () => System.import('./MenuPlatos.vue')
  },
  computed: {
    ...mapState({
      'categorias': (state) => state.categorias_with_platos
    })
  },
  methods: {
    setDireccionDelServidor (direccion) {
      this.$store.dispatch('SET_SERVER', direccion).then(response => {
        this.$store.dispatch('REFRESH_CATEGORIAS_WITH_PLATOS_TEMPORAL', response)
        window.localStorage.setItem('servidor', response)
      })
    },
    displayServerDialog () {
      this.setDireccionDelServidor(this.address)
    }
  },
  mounted () {
    let server = window.localStorage.getItem('servidor')
    if (server === undefined) {
      this.displayServerDialog()
    } else {
      this.$store.dispatch('SET_SERVER', server).then(response => {
        this.$store.dispatch('REFRESH_CATEGORIAS_WITH_PLATOS_TEMPORAL', response)
      })
    }
    this.address = server
    // window.EventBus.$on('deshabilitarPlatos', (payload) => { this.$store.dispatch('DESHABILTAR_PLATOS', payload) })
    // window.EventBus.$on('habilitarPlatos', (payload) => { this.$store.dispatch('HABILTAR_PLATOS', payload) })
    //
    // // WebSocket
    // window.Echo.channel('platos')
    //   .listen('deshabilitarPlatos', e => { this.$store.dispatch('DESHABILTAR_PLATOS', e) })
    //   .listen('habilitarPlatos', e => { this.$store.dispatch('HABILTAR_PLATOS', e) })
    //   .listen('App.Events.habilitarPlatos', e => { console.log(e) })
    //   .listen('App.Events.deshabilitarPlatos', e => { console.log(e) })
  },
  created () {
    window.localStorage.setItem('servidor', URL)
  }
}
</script>

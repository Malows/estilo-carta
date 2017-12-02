<template lang="pug">
  .layout-view
    .column.is-gapless.is-fullwidth.is-10-desktop.is-offset-1-desktop.is-8-widescreen.is-offset-2-widescreen
      menu-platos( v-for="categoria in categorias" :categoria='categoria' :key='categoria.id')
    input.input(type="text" v-model="address")
    button.button( @click="setDireccionDelServidor") Servidor
</template>

<script>
import 'bulma/css/bulma.css'
import { mapState } from 'vuex'
import { URL } from '../api'
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
  methods: {
    setDireccionDelServidor () {
      this.$store.dispatch('setServer', this.address).then(response => {
        this.$store.dispatch('resfreshTemporalCategorias', response)
      })
    }
  },
  mounted () {
    this.$store.dispatch('refreshCategorias')
    this.$store.dispatch('refreshPlatos')
    // let server = window.localStorage.getItem('servidor')
    // console.log('en mounted', server)
    // if (server === undefined) this.setDireccionDelServidor()
    // else {
    //   this.$store.dispatch('setServer', this.address).then(response => {
    //     this.$store.dispatch('resfreshTemporalCategorias', response)
    //     this.address = response
    //   })
    // }
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
    console.log(URL)
    localStorage.setItem('servidor', URL)
  }
}
</script>

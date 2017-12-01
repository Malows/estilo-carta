<template>
  <div
    v-on:click="toggleImageVisibility"
    ref="contenedor"
    class="column is-one-third-mobile is-one-quarter-tablet plato"
    v-show="plato.habilitado">

    <img :src="plato.foto"  v-show="displayPicture" :style="{'height': ancho+'px'}" >
    <div v-show="!displayPicture" :style="{'height': ancho+'px'}">
      <p><strong>{{plato.nombre}}</strong></p>
      <p>${{plato.precio}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['plato'],
  data () {
    return {
      displayPicture: true,
      ancho: 0
    }
  },
  methods: {
    toggleImageVisibility () {
      if (this.displayPicture) {
        window.EventBus.$emit('toggleVisibility', this.plato.id)
      } else {
        this.displayPicture = true
      }
    }
  },
  mounted () {
    this.ancho = this.$refs.contenedor.offsetWidth

    window.EventBus.$on('toggleVisibility', (id) => {
      if (this.plato.id === id) {
        this.displayPicture = false
      } else {
        this.displayPicture = true
      }
    })
  }
}
</script>

<style scoped>
.plato {
  padding: 0;
  display: flex;
  /*align-content: stretch;*/
}
.texto {
  padding: 0;
  margin: 0 auto;
}
.img-responsive {
  width: 100%;
  height: 100%;
}
</style>

<template lang="pug">
  .column.is-one-third-mobile.is-one-quarter-tablet.plato(
    @click="toggleImageVisibility" ref="contenedor" v-show="plato.habilitado"
    )
    .crop
      img.img-responsive(:src="plato.foto"  v-show="displayPicture")
      .texto(v-show="!displayPicture")
        p
          strong {{ plato.nombre }}
        p ${{ plato.precio }}
</template>

<script>
export default {
  name: 'plato',
  props: ['plato'],
  data () {
    return {
      displayPicture: true
      // ancho: 0
    }
  },
  methods: {
    toggleImageVisibility () {
      if (this.displayPicture) window.EventBus.$emit('toggleVisibility', this.plato.id)
      else this.displayPicture = true
    }
  },
  mounted () {
    // this.ancho = this.$refs.contenedor.offsetWidth
    window.EventBus.$on('toggleVisibility', id => {
      if (this.plato.id === id) this.displayPicture = false
      else this.displayPicture = true
    })
  }
}
</script>

<style scoped>
.plato {
  padding: 0;
  display: flex;
  height: 194px;
  /* el width viene de bulma */
}
.crop {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.img-responsive {
  display: block;
  min-width: 100%;
  min-height: 100%;
  margin: auto;
  position: absolute;
  top: -100%;
  right: -100%;
  bottom: -100%;
  left: -100%;
}
.texto {

  padding: 0;
  margin: 0 auto;
}
</style>

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import store from './store.js'

import { DOMAIN_NO_PORT } from './api'

// Socket.io - Solo
import io from 'socket.io-client'
window.io = io

// Pusher - Solo
// import Pusher from 'pusher-js'
// window.Pusher = Pusher

// Laravel Echo
import Echo from 'laravel-echo'

Vue.use(Quasar) // Install Quasar Framework

Quasar.start(() => {
  /* eslint-disable */
  window.EventBus = new Vue({})
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    render: h => h(require('./App'))
  })
})

// Pusher ready for connection

/*
let pusher = new Pusher(
  '4c9a8e0aeee72425ec71',
  {
    cluster: 'us2',
    encrypted: true
  })

let channel = pusher.subscribe('platos')
channel.bind('deshabilitarPlatos', e => { store.dispatch('DESHABILTAR_PLATOS', e) })
channel.bind('habilitarPlatos', e => { store.dispatch('HABILTAR_PLATOS', e) })
*/

// Socket.io ready for connection

// const socket = io(`${DOMAIN_NO_PORT}:6001/socket.io`.replace(/^(http)+(s?)+:(\/\/)/,''))
// socket.emit('subscribe', { channel: 'platos' })
// socket.on('deshabilitarPlatos', e => { delete e.socket; store.dispatch('DESHABILTAR_PLATOS', Object.values(e)) })
// socket.on('habilitarPlatos', e => { delete e.socket; store.dispatch('HABILTAR_PLATOS', Object.values(e)) })
// console.log(socket)

// laravel-echo connection
/*
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '4c9a8e0aeee72425ec71',
  cluster: 'us2',
  encrypted: true,
  namespace: ''
})
*/

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: `${DOMAIN_NO_PORT}:6001`, // .replace(/^(http)+(s?)+:(\/\/)/,'')
  namespace: ''
})

window.Echo.channel('platos')
.listen('deshabilitarPlatos', e => {delete e.socket; store.dispatch('DESHABILTAR_PLATOS', Object.values(e)) })
.listen('habilitarPlatos', e => {delete e.socket; store.dispatch('HABILTAR_PLATOS', Object.values(e)) })

window.setTimeout(() => { alert( 'tu socket es '+ window.Echo.socketId()) }, 5000)

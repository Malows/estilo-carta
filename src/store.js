import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import { CATEGORIAS_URL } from './api'

let parseDatos = (platos) => (valor) => Array.isArray(platos)
    ? Object.assign({}, {platos}, {valor})
    : Object.assign({}, {platos: [platos]}, {valor})

let urlParse = (direccion) => (direccion.includes('http'))
  ? 'http://' + direccion.replace(/(http)+(s?)+(:\/\/)/i, '').replace('/api', '') + '/api'
  : 'http://' + direccion + '/api'

export default new Vuex.Store({
  state: {
    categorias_with_platos: []
  },

  actions: {
    REFRESH_CATEGORIAS_WITH_PLATOS ({ commit }) {
      axios.get(CATEGORIAS_URL).then(({ data }) => {
        commit('SET_CATEGORIAS_WITH_PLATOS', data)
      })
    },
    REFRESH_CATEGORIAS_WITH_PLATOS_TEMPORAL ({ commit }, payload) {
      axios.get(`${payload}/categorias`).then(({ data }) => {
        commit('SET_CATEGORIAS_WITH_PLATOS', data)
      })
    },
    DESHABILTAR_PLATOS ({ commit }, payload) {
      commit('SET_ESTADOS_PLATOS', parseDatos(payload)(false))
    },
    HABILTAR_PLATOS ({ commit }, payload) {
      commit('SET_ESTADOS_PLATOS', parseDatos(payload)(true))
    },
    SET_SERVER ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let url = urlParse(payload)
        commit('SET_SERVER', url)
        resolve(url)
      })
    }
  },

  mutations: {
    SET_CATEGORIAS_WITH_PLATOS (state, categorias) {
      state.categorias_with_platos = categorias
    },
    SET_ESTADOS_PLATOS (state, permutadores) {
      let ids = permutadores.platos
      let valor = permutadores.valor
      state.categorias_with_platos.forEach(categoria => {
        categoria.platos = categoria.platos.map(plato => {
          if (ids.length && ids.includes(plato.id)) {
            ids.splice(ids.indexOf(plato.id), 1)
            return Object.assign({}, plato, {habilitado: valor})
          } else {
            return plato
          }
        })
      })
    },
    SET_SERVER (state, servidor) {
      state.servidor = servidor
    }
  },

  getters: {
    categorias (state) {
      return state.categorias_with_platos.map(categoria => {
        return {
          id: categoria.id,
          nombre: categoria.nombre
        }
      })
    },
    platos (state) {
      return state.categorias_with_platos.reduce((acc, curr) => acc.concat(curr.platos), [])
    },
    nombreDePlatos (state, getters) {
      let aux = []
      getters.platos.forEach((plato) => { aux[plato.id] = plato.nombre })
      return aux
    }
  }
})

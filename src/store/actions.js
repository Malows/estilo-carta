import axios from 'axios'
import { CATEGORIAS_URL, PLATOS_URL } from '../api'

const parseDatos = (valor, platos) =>
  Array.isArray(platos)
    ? Object.assign({}, { platos }, { valor })
    : Object.assign({}, { platos: [platos] }, { valor })

const urlParse = direccion =>
  direccion.includes('http')
    ? `http://${direccion.replace(/(http)+(s?)+(:\/\/)/i, '').replace('/api', '')}/api`
    : `http://${direccion}/api`

const permuter = valor => ({ commit }, payload) => {
  commit('SET_ESTADOS_PLATOS', parseDatos(valor, payload))
}

const refresher = (url, commiter) => ({ commit }) => {
  axios.get(url).then(({ data }) => commit(commiter, data))
}

export default {
  refreshCategorias: refresher(CATEGORIAS_URL, 'SET_CATEGORIAS'),
  refreshPlatos: refresher(PLATOS_URL, 'SET_PLATOS'),
  deshabilitarPlatos: permuter(false),
  habilitarPlato: permuter(true),
  resfreshTemporalCategorias ({ commit }, payload) {
    axios.get(`${urlParse(payload)}/categorias`).then(({ data }) => {
      commit('SET_CATEGORIAS', data)
    })
  },
  setServer ({ commit }, payload) {
    return new Promise(resolve => {
      // const url = urlParse(payload)
      commit('SET_SERVER', payload)
      localStorage.setItem('servidor', payload)
      resolve(payload)
    })
  }
}

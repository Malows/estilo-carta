import axios from 'axios'
import { CATEGORIAS_URL } from '../api'

const parseDatos = (valor, platos) =>
  Array.isArray(platos)
    ? Object.assign({}, { platos }, { valor })
    : Object.assign({}, { platos: [platos] }, { valor })

const permuter = valor => ({ commit }, payload) => {
  commit('SET_ESTADOS_PLATOS', parseDatos(valor, payload))
}

const refresher = (url, commiter) => ({ commit }) => {
  axios.get(url).then(({ data }) => commit(commiter, data))
}

export default {
  refreshCategorias: refresher(CATEGORIAS_URL, 'SET_CATEGORIAS'),
  deshabilitarPlatos: permuter(false),
  habilitarPlato: permuter(true)
}

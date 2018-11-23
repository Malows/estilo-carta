const simpleSetter = x => (state, input) => {
  state[x] = Array.isArray(input) ? input.slice(0) : input
}

export default {
  SET_CATEGORIAS: simpleSetter('categorias'),

  SET_ESTADOS_PLATOS (state, permutadores) {
    const ids = permutadores.platos
    const habilitado = permutadores.valor
    state.categorias.forEach(categoria => {
      categoria.platos = categoria.platos.map(plato => {
        if (ids.length && ids.includes(plato.id)) {
          ids.splice(ids.indexOf(plato.id), 1)
          return Object.assign({}, plato, { habilitado })
        } else {
          return plato
        }
      })
    })
  }
}

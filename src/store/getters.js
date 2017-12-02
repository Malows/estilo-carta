const idNameOnly = x => state =>
  state[x].map(y => Object.assign({}, { id: y.id, nombre: y.nombre }))

export default {
  categoriasNames: idNameOnly('categorias'),
  platosName: idNameOnly('platos')
}

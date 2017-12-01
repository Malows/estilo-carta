export const DOMAIN = 'http://192.168.1.100:8000'
export const DOMAIN_NO_PORT = DOMAIN.replace(/:+\d+$/, '')
export const URL_PREFIX = DOMAIN + '/api'
export const URL = URL_PREFIX + '' // version de la api

export const LOGIN_URL = URL + ''
export const CATEGORIAS_URL = URL + '/categorias'
export const PEDIDOS_URL = URL + '/pedidos'
export const DIGEST_PEDIDOS_URL = URL + '/digest/pedidos'
export const MESAS_URL = URL + '/mesas'
export const PLATOS_URL = URL + '/platos'
export const PERSONAL_URL = URL + '/personal'

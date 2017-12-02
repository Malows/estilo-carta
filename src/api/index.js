export const DOMAIN = 'http://192.168.1.100:8000'
export const DOMAIN_NO_PORT = DOMAIN.replace(/:+\d+$/, '')
export const URL_PREFIX = DOMAIN + '/api'
export const URL = URL_PREFIX + '' // version de la api

export const CATEGORIAS_URL = URL + '/categorias'
export const PLATOS_URL = URL + '/platos'

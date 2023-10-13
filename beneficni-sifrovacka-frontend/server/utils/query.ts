import qs from 'qs'

export function stringify (query: any) {
  return qs.stringify(query, { encode: false })
}

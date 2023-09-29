export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/users/me`
  const headers = getHeaders(event)

  try {
    return await $fetch(url, { method: 'GET', headers: { Authorization: headers.authorization! } })
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

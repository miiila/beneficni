export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/users/${event.context.params.id}`
  const body = await readBody(event)
  const headers = getHeaders(event)

  try {
    return await $fetch(url, { method: 'PUT', body, headers: { Authorization: headers.authorization! } })
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when updating the team' })
  }
})

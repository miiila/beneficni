export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/auth/local`
  const body = await readBody(event)
  try {
    return await $fetch(url, { method: 'POST', body })
  } catch (err: any) {
    console.error(JSON.stringify(err.data, null, 2))
    if (err.data.error.status === 400) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
    }
  }
})

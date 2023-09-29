export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/auth/forgot-password`
  const body = await readBody(event)

  return await $fetch(url, { method: 'POST', body })
})

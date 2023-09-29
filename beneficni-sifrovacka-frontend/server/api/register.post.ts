export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/auth/local/register`
  const body = await readBody(event)
  try {
    return await $fetch(url, { method: 'POST', body })
  } catch (e: any) {
  }
})

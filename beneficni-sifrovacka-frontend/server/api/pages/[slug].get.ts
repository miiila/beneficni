export default defineEventHandler(async (event) => {
  const config: { apiHost: string, apiBase: string, pageMap: Record<string, string> } = useRuntimeConfig()
  const slug = event.context.params!.slug
  const id = config.pageMap[slug]
  const url = `${config.apiHost}/${config.apiBase}/pages/${id}`
  const res: any = await $fetch(url)

  return res.data
})

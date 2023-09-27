export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const url = `${config.apiHost}/${config.apiBase}/users`

  const res = await $fetch<any[]>(url)
  const users = res.map((team) => {
    return {
      id: team.id,
      username: team.username,
      name: team.name,
      members: team.members,
    }
  })

  return users
})


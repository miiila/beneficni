import qs from 'qs'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  } 
  const query = qs.stringify({ fields: ['id'], populate: { team_actions: { fields: '*', populate: { puzzle: { fields: ['id'] } } } }, sort: 'id' }, {
    encodeValuesOnly: true // prettify URL
  })

  const teamActionsUrl = `${config.apiHost}/${config.apiBase}/users/me?${query}`
  const headers = getHeaders(event)
  try {
    const teamActionsRaw = await $fetch(teamActionsUrl, { method: 'GET', headers: { Authorization: headers.authorization! } })

  return teamActionsRaw.team_actions.map((teamAction: any) => {
    return {
      id: teamAction.id,
      puzzleId: teamAction.puzzle.id,
      action: teamAction.action,
      timestamp: teamAction.timestamp,
      payload: teamAction.payload ?? "HESLO"
    }
  })
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

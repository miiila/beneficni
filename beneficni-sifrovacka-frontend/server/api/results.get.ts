import qs from 'qs'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  } 

  const query = qs.stringify({ filters: { action: { $ne: 'failed' } }, populate: { puzzle: { fields: ['id'] }, team: { fields: ['username'] } } }, {
    encodeValuesOnly: true // prettify URL
  })
  const puzzleStatesUrl = `${config.apiHost}/${config.apiBase}/team-actions?${query}`
  const headers = getHeaders(event)

  try {
    const actionsRaw: any = await $fetch(puzzleStatesUrl, { method: 'GET', headers: { Authorization: headers.authorization! } })
    const actions = actionsRaw.data.reduce((actions: any, action: any) => {
      const teamName = action.attributes.team.data.attributes.username
      const puzzleId = action.attributes.puzzle.data.id
      if (!actions[teamName]) {
        actions[teamName] = {}
      }
      if (!actions[teamName][puzzleId]) {
        actions[teamName][puzzleId] = {}
      }
      actions[teamName][puzzleId][action.attributes.action] = new Date(action.attributes.timestamp)
      return actions
    }, {})

    const results = Object.entries(actions).reduce((results: any, [teamName, teamActions]: any) => {
      if (!results[teamName]) {
        results[teamName] = { solved: 0, totalTime: new Date(0) }
      }
      for (const puzzleActions of Object.values(teamActions)) {
        if (puzzleActions.solved) {
          results[teamName].solved++
          console.log(puzzleActions.solved, puzzleActions.unlocked, puzzleActions.solved - puzzleActions.unlocked)
          results[teamName].totalTime = new Date(results[teamName].totalTime.getTime() + (puzzleActions.solved - puzzleActions.unlocked))
        }
      }
      return results
    }, {})

    const resultsArray = Object.entries(results).map(([teamName, teamResults]: any) => {
      return { teamName, ...teamResults }
    })

    const sortedResults = resultsArray.sort((a: any, b: any) => {
      if (a.solved === b.solved) {
        return a.totalTime.getTime() - b.totalTime.getTime()
      } else {
        return b.solved - a.solved
      }
    })

    return sortedResults
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

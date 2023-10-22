import qs from 'qs'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  }
  const teamActionsQuery = qs.stringify({sort: "id", fields: '*', populate: { puzzle: { fields: ['id'] }, team: { fields: ['id', 'username'] } } }, {
    encodeValuesOnly: true // prettify URL
  })
  const puzzlesQuery = qs.stringify({ fields: 'id', populate: { logo: { fields: 'url' } } }, {
    encodeValuesOnly: true // prettify URL
  })

  const teamActionsUrl = `${config.apiHost}/${config.apiBase}/team-actions?${teamActionsQuery}`
  const puzzlesUrl = `${config.apiHost}/${config.apiBase}/puzzles?${puzzlesQuery}`
  try {
    const teamActionsRaw = await $fetch(teamActionsUrl, { method: 'GET' } )
    const puzzlesRaw = await $fetch(puzzlesUrl, { method: 'GET' } )


    const teamActions = teamActionsRaw.data.reduce((stats, teamAction: any) => {
      const teamName = teamAction.attributes.team.data.attributes.username;
      if (!stats[teamName]) {
        stats[teamName] = {puzzles: {}, solved: 0, time: new Date(0).getTime()}
      }
      const puzzleId = teamAction.attributes.puzzle.data.id;
      if (!stats[teamName].puzzles[puzzleId]) {
        stats[teamName].puzzles[puzzleId] = []
      }
      // There might be duplicates because of race conditions, let's remove them, failed duplicates doesn't matter
      if (teamAction.attributes.action === 'solved' || teamAction.attributes.action === 'unlocked') {
        const existing = stats[teamName].puzzles[puzzleId].some((action) => {
          return action.action === teamAction.attributes.action
        })

        if (existing) {
          return stats
        }
      }
      // if () {
      //   // do not process duplicated action
      //   return stats
      // }
      stats[teamName].puzzles[puzzleId].push({action: teamAction.attributes.action, timestamp: teamAction.attributes.timestamp, payload: teamAction.attributes.payload})

      if (teamAction.attributes.action === 'solved') {
        stats[teamName].solved++
        const unlockTimestamp = stats[teamName].puzzles[puzzleId].find((action: any) => action.action === 'unlocked')?.timestamp
        const solveTimestamp = teamAction.attributes.timestamp
        stats[teamName].time += new Date(solveTimestamp).getTime() - new Date(unlockTimestamp).getTime()
      }
      return stats
    }, {})

    return {teamActions, puzzles: puzzlesRaw.data.map((puzzle: any) => ({id: puzzle.id, logoUrl: `${config.apiHost}${puzzle.attributes.logo.data.attributes.url}`})).sort((a: any, b: any) => a.id - b.id)}
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

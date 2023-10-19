import qs from 'qs'
import { type Puzzle } from '~/server/api/types'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  }

  const query = qs.stringify({ fields: ['id'], populate: { puzzles_teams: { populate: { puzzle: { populate: { logo: { fields: ['url'] } } } } }, team_actions: { fields: '*', populate: { puzzle: { fields: ['id'] } } } } }, {
    encodeValuesOnly: true // prettify URL
  })

  const puzzleStatesUrl = `${config.apiHost}/${config.apiBase}/users/me?${query}`
  const headers = getHeaders(event)

  try {
    const puzzlesRaw = await $fetch(puzzleStatesUrl, { method: 'GET', headers: { Authorization: headers.authorization! } })
    const teamActions = puzzlesRaw.team_actions.reduce((actions: any, action: any) => {
      if (!actions[action.puzzle.id]) {
        actions[action.puzzle.id] = []
      }
      actions[action.puzzle.id].push(action)
      return actions
    }, {})
    const puzzles: Puzzle[] = puzzlesRaw.puzzles_teams.map((puzzleState: any) => {
      const failedActions = (teamActions[puzzleState.puzzle.id] ?? []).filter((action: any) => action.action  === 'failed').sort((a: any, b: any) => b.id - a.id)
      return {
        id: puzzleState.puzzle.id,
        stateId: puzzleState.id,
        url: puzzleState.state !== 'locked' ? puzzleState.puzzle.url : '',
        logoUrl: `${config.apiHost}${puzzleState.puzzle.logo?.url}` ?? '',
        description: puzzleState.puzzle.description ?? '',
        state: puzzleState.state,
        solution: puzzleState.state === 'solved' ? puzzleState.puzzle.solution : '',
        nextAttempt: failedActions.length >= 2 ?  new Date(failedActions[0].timestamp).setMinutes(new Date(failedActions[0].timestamp).getMinutes() + 10) : undefined,
        actions: (teamActions[puzzleState.puzzle.id] ?? []).reduce((actions: any, action: any) => {
          actions[action.action] = action.timestamp
          return actions
        }, {})
      }
    })

    const puzzlesSorted = puzzles.sort((a: any, b: any) => {
      return a.id - b.id
    })

    return puzzlesSorted
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

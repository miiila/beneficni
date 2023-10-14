import qs from 'qs'
import { type Puzzle } from '~/server/types'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  }

  const query = qs.stringify({ fields: ['id'], populate: { puzzles_teams: { populate: { puzzle: { populate: { logo: { fields: ['url'] }, team_actions: { fields: '*' } } } } } } }, {
    encodeValuesOnly: true // prettify URL
  })

  const puzzleStatesUrl = `${config.apiHost}/${config.apiBase}/users/me?${query}`
  const headers = getHeaders(event)

  try {
    const puzzlesRaw = await $fetch(puzzleStatesUrl, { method: 'GET', headers: { Authorization: headers.authorization! } })
    const puzzles: Puzzle[] = puzzlesRaw.puzzles_teams.map((puzzleState: any) => {
      return {
        id: puzzleState.puzzle.id,
        stateId: puzzleState.id,
        url: puzzleState.state !== 'locked' ? puzzleState.puzzle.url : '',
        logoUrl: `${config.apiHost}${puzzleState.puzzle.logo?.url}` ?? '',
        description: puzzleState.puzzle.description ?? '',
        state: puzzleState.state,
        solution: puzzleState.state === 'solved' ? puzzleState.puzzle.solution : '',
        actions: puzzleState.puzzle.team_actions.reduce((actions: any, action: any) => {
          actions[action.action] = action.timestamp
          return actions
        }, {})
      }
    })

    return puzzles
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

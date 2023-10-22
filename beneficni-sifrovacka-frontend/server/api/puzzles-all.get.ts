import qs from 'qs'
import { type Puzzle } from '~/server/api/types'

export default defineEventHandler(async (event) => {
  const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
  if (!config.public.gameStarted) {
    return []
  }

  const query = qs.stringify({ sort: 'id', populate: { logo: { fields: ['url'] } } } , {
    encodeValuesOnly: true // prettify URL
  })

  const puzzlesUrl = `${config.apiHost}/${config.apiBase}/puzzles?${query}`
  // const headers = getHeaders(event)

  try {
    const puzzlesRaw = await $fetch(puzzlesUrl, { method: 'GET' } )
    const puzzles: Puzzle[] = puzzlesRaw.data.map((puzzle: any) => {
      return {
        id: puzzle.id,
        url: puzzle.url,
        logoUrl: `${config.apiHost}${puzzle.attributes.logo.data.attributes.url}` ?? '',
        description: puzzle.attributes.description ?? '',
        solution: puzzle.attributes.solution,
        solutionDetails: puzzle.attributes.solution_details,
      }
    })

    return puzzles
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: err.data?.error.status, statusMessage: 'Something bad happened when fetching the team' })
  }
})

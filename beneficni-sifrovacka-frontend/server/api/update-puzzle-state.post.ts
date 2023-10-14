export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  console.log(await readBody(event))
  const body = await readBody(event)
  const headers = getHeaders(event)

  try {
    // Fetch puzzle - url neede for open state, solution for solved state
    const puzzleUrl = `${config.apiHost}/${config.apiBase}/puzzles/${body.puzzleId}`
    const puzzle = await $fetch(puzzleUrl, { method: 'GET', headers: { Authorization: headers.authorization! } })
    const puzzlesTeamsUrl = `${config.apiHost}/${config.apiBase}/puzzles-teams/${body.puzzleStateId}`
    const teamActionsUrl = `${config.apiHost}/${config.apiBase}/team-actions`
    const stateUpdate = { state: body.state }
    const actionUpdate = { action: 'unlocked', timestamp: Date.now(), team: body.teamId, puzzle: body.puzzleId }
    // Solving puzzle
    if (body.state === 'solved') {
      // Wrong solution
      if (!compareSolutions(body.solution, puzzle.data.attributes.solution)) {
        actionUpdate.action = 'failed'
        await $fetch(teamActionsUrl, { method: 'POST', body: { data: actionUpdate }, headers: { Authorization: headers.authorization! } })
        throw createError({ statusCode: 400, statusMessage: 'Wrong solution' })
      }
      // Correct solution
      actionUpdate.action = 'solved'
    } else {
      // Unlocking puzzle
      actionUpdate.action = 'unlocked'
    }

    // Update puzzle state and add action
    const puzzleState = await $fetch(puzzlesTeamsUrl, { method: 'PUT', body: { data: stateUpdate }, headers: { Authorization: headers.authorization! } })
    const teamAction = await $fetch(teamActionsUrl, { method: 'POST', body: { data: actionUpdate }, headers: { Authorization: headers.authorization! } })

    // Return new state
    const newAction = {}
    newAction[teamAction.data.attributes.action] = teamAction.data.attributes.timestamp
    const newState = { puzzleUpdates: { state: puzzleState.data.attributes.state, url: puzzle.data.attributes.url }, actionsUpdates: newAction }

    if (body.state === 'solved') {
      newState.puzzleUpdates.solution = puzzle.data.attributes.solution
    }
    return newState
  } catch (err: any) {
    if (err.statusCode === 400) {
      throw err
    }
    throw createError({ statusCode: err.data?.error?.status, statusMessage: 'Something bad happened when updating the puzzle' })
  }
})

function compareSolutions (input: string, expected: string) {
  return input.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') === expected.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

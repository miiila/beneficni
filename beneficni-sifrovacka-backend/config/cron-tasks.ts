export default {
  puzzlesSync: {
    task: async ({ strapi }) => {
      console.log('Updating puzzle states')
      //const teams = await strapi.db.query("plugin::users-permissions.user").findMany({
        //select: ['id'],
      //})
      const puzzles = await strapi.db.query("api::puzzle.puzzle").findMany({
        select: ['id'],
      })
      const teams = [{id: 89}, {id: 90}]
      console.log("team", teams)
      console.log("puzzle", puzzles)
      const datas = teams.map(team => {
        return puzzles.map(puzzle => {
          return {team: team.id, puzzle: puzzle.id, state: 'locked'}
        })
      }).flat()
      for (const data of datas) {
      const result = await strapi.entityService.create("api::puzzles-team.puzzles-team", {data})
        console.log(result)
      }
    },
    options: new Date("2023-10-21T10:10:00+02:00"),
  },
};


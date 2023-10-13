export default {
  puzzlesSync: {
    task: async ({ strapi }) => {
      console.log('Updating puzzle states')
      const teams = await strapi.db.query("plugin::users-permissions.user").findMany({
        select: ['id'],
      })
      const puzzles = await strapi.db.query("api::puzzle.puzzle").findMany({
        select: ['id'],
      })
      console.log("team", teams)
      console.log("puzzle", puzzles)
      const data = teams.map(team => {
        return puzzles.map(puzzle => {
          return {team: team.id, puzzle: puzzle.id, state: 'locked'}
        })
      }).flat()
      //const updateResult = await strapi.db.query("plugin::users-permissions.user").updateMany({
        //where: {
          //id: idsToUpdate,
        //},
        //data: {
          //paid: true,
        //},
      //});
      console.log(data, typeof data)
      const result = await strapi.db.query("api::puzzles-team.puzzles-team").createMany({data})
      console.log(result)
    },
    options: {
      rule: "0 * 0 * * *",
    },
  },
};


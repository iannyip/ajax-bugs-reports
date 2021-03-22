export default function initBugsController(db) {
  const root = async (request, response) => {
    response.render('root');
  };

  const create = async (request, response) => {
    try {
      console.log('create ran');
      console.log(request.body);

      const newBug = await db.Bug.create(request.body);
      console.log(newBug);
    } catch (error) {
      console.log(error);
    }
  };

  const index = async (request, response) => {
    try {
      const bugsList = await db.Bug.findAll({
        include: db.Feature,
      });
      console.log(bugsList);
      bugsList.forEach((bug) => {
        console.log(`--- ${bug.id} ---`);
        console.log(bug.problem);
        console.log(bug.errorText);
        console.log(bug.feature.name);
      });
      response.send(bugsList);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    root,
    create,
    index,
  };
}

export default function initUsersController(db) {
  const login = async (request, response) => {
    try {
      const features = await db.Feature.findAll();
      response.send(features);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    login,
  };
}

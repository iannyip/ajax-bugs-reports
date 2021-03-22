export default function initFeaturesController(db) {
  const index = async (request, response) => {
    try {
      const features = await db.Feature.findAll();
      response.send(features);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    index,
  };
}

const jsSHA = require('jssha');

const hash = (text) => {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(text);
  const hashedText = shaObj.getHash('HEX');
  return hashedText;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const features = ['navbar', 'table', 'modal', 'jumbotron', 'picture'];
    const featuresList = [];
    features.forEach((feature) => {
      featuresList.push({
        name: feature,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
    await queryInterface.bulkInsert('features', featuresList, { returning: true });

    await queryInterface.bulkInsert('users', [
      {
        email: 'kai@gmail.com',
        password: hash('kaipassword'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'akira@gmail.com',
        password: hash('akirapassword'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'ian@gmail.com',
        password: hash('ianpassword'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    { returning: true });

    await queryInterface.bulkInsert('bugs', [
      {
        problem: 'I couldnt find the navbar',
        error_text: 'the navbar is too small',
        commit: 12356,
        feature_id: 1,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        problem: 'Table formatting',
        error_text: 'Table formatting is weird',
        commit: 54652,
        feature_id: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        problem: 'Modal formatting',
        error_text: 'modal freezes after some time',
        commit: 86532,
        feature_id: 3,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bugs', null, {});
    await queryInterface.bulkDelete('features', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};

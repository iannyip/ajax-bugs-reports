export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define(
    'bug',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      problem: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      errorText: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      commit: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      featureId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        reference: {
          model: 'features',
          key: 'id',
        },
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        reference: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}


module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transactions',
    {
      operationType: {
        type: DataTypes.ENUM('INCOM', 'EXPENCE'),
        allowNull: false,
      },
      summa: {
        type:DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
    {
      timestamps: false,
    },
  );
  Transaction.associate = function (models){
    Transaction.belongsTo(models.Users, { foreignKey: { name: 'userId', allowNull: false } });
  };
  return Transaction;
};


module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      operationType: {
        type: DataTypes.ENUM('INCOME', 'EXPENSE'),
        allowNull: false,
      },
      summa: {
        type:DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
    // {
    //   timestamps: false,
    // },
  );
  Transaction.associate = function (models){
    Transaction.belongsTo(models.Users, { foreignKey: { name: 'userId', allowNull: false } });
  };
  return Transaction;
};

const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {      //컬럼1
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: {                       //중복데이터 x
            args: true,
            msg: "Email already in use!",
          },
        },  
        password: {   //컬럼2
          type: Sequelize.STRING(100),
          allowNull: false,               //Null x 
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",    //Class명
        tableName: "users",   //DB table명
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Member, { foreignKey: "userId", soruceKey: "id", onDelete: "cascade" }); //User 1 : Member 다
    db.User.hasMany(db.Group, { foreignKey: "userId", soruceKey: "id", onDelete: "cascade" });
  }
};

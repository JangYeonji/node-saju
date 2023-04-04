const Sequelize = require("sequelize");

//Q. 클래스명, DB 테이블명, DB 컬럼 개수, Member.hasMany(db.GroupMember) 관계

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(6),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING(6),
          allowNull: false,
        },
        birthdayType: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        birthday: {
          type: Sequelize.DATEONLY,     //년/월/일만 저장
          allowNull: false,
        },
        time: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Member",
        tableName: "members",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Member.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });    //users 테이블의 foreignKey, Member 1 : User 1
    db.Member.hasMany(db.GroupMember, { foreignKey: "memberId", sourceKey: "id", onDelete: "cascade" });
    db.Member.hasOne(db.MemberManse, { foreignKey: "memberId", sourceKey: "id", onDelete: "cascade" });   //Member 1 : MemberManse 1
  }
};

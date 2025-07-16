import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";
 
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  otp: {
    type: DataTypes.INTEGER,
  },
});
 
export default User;
 
 
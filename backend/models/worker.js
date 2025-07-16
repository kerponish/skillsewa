import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Worker = sequelize.define("Worker", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skill: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
});

export default Worker;

import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Worker = sequelize.define("Worker", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  },
});

export default Worker;

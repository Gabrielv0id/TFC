import { 
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes 
} from 'sequelize';
import db from '.';

export default class Team 
  extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  modelName: 'teams',
  sequelize: db,
  underscored: true,
  timestamps: false,
});

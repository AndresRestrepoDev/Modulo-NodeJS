import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { movements, movementsId } from './movements.ts';
import type { warehouses, warehousesId } from './warehouses.ts';

export interface productsAttributes {
  id: number;
  name: string;
  code: string;
  stock?: number;
  warehouse_id?: number;
  created_at?: Date;
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id" | "stock" | "warehouse_id" | "created_at";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  declare id: number;
  declare name: string;
  declare code: string;
  declare stock?: number;
  declare warehouse_id?: number;
  declare created_at?: Date;

  // products hasMany movements via product_id
  movements!: movements[];
  getMovements!: Sequelize.HasManyGetAssociationsMixin<movements>;
  setMovements!: Sequelize.HasManySetAssociationsMixin<movements, movementsId>;
  addMovement!: Sequelize.HasManyAddAssociationMixin<movements, movementsId>;
  addMovements!: Sequelize.HasManyAddAssociationsMixin<movements, movementsId>;
  createMovement!: Sequelize.HasManyCreateAssociationMixin<movements>;
  removeMovement!: Sequelize.HasManyRemoveAssociationMixin<movements, movementsId>;
  removeMovements!: Sequelize.HasManyRemoveAssociationsMixin<movements, movementsId>;
  hasMovement!: Sequelize.HasManyHasAssociationMixin<movements, movementsId>;
  hasMovements!: Sequelize.HasManyHasAssociationsMixin<movements, movementsId>;
  countMovements!: Sequelize.HasManyCountAssociationsMixin;
  // products belongsTo warehouses via warehouse_id
  warehouse!: warehouses;
  getWarehouse!: Sequelize.BelongsToGetAssociationMixin<warehouses>;
  setWarehouse!: Sequelize.BelongsToSetAssociationMixin<warehouses, warehousesId>;
  createWarehouse!: Sequelize.BelongsToCreateAssociationMixin<warehouses>;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "products_code_key"
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "products_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { movements, movementsId } from './movements.ts';
import type { products, productsId } from './products.ts';

export interface warehousesAttributes {
  id: number;
  name: string;
  location?: string;
  created_at?: Date;
}

export type warehousesPk = "id";
export type warehousesId = warehouses[warehousesPk];
export type warehousesOptionalAttributes = "id" | "location" | "created_at";
export type warehousesCreationAttributes = Optional<warehousesAttributes, warehousesOptionalAttributes>;

export class warehouses extends Model<warehousesAttributes, warehousesCreationAttributes> implements warehousesAttributes {
  declare id: number;
  declare name: string;
  declare location?: string;
  declare created_at?: Date;

  // warehouses hasMany movements via warehouse_destiny_id
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
  // warehouses hasMany movements via warehouse_origin_id
  warehouse_origin_movements!: movements[];
  getWarehouse_origin_movements!: Sequelize.HasManyGetAssociationsMixin<movements>;
  setWarehouse_origin_movements!: Sequelize.HasManySetAssociationsMixin<movements, movementsId>;
  addWarehouse_origin_movement!: Sequelize.HasManyAddAssociationMixin<movements, movementsId>;
  addWarehouse_origin_movements!: Sequelize.HasManyAddAssociationsMixin<movements, movementsId>;
  createWarehouse_origin_movement!: Sequelize.HasManyCreateAssociationMixin<movements>;
  removeWarehouse_origin_movement!: Sequelize.HasManyRemoveAssociationMixin<movements, movementsId>;
  removeWarehouse_origin_movements!: Sequelize.HasManyRemoveAssociationsMixin<movements, movementsId>;
  hasWarehouse_origin_movement!: Sequelize.HasManyHasAssociationMixin<movements, movementsId>;
  hasWarehouse_origin_movements!: Sequelize.HasManyHasAssociationsMixin<movements, movementsId>;
  countWarehouse_origin_movements!: Sequelize.HasManyCountAssociationsMixin;
  // warehouses hasMany products via warehouse_id
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof warehouses {
    return warehouses.init({
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
    location: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'warehouses',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "warehouses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

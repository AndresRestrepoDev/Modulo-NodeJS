import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { products, productsId } from './products.ts';
import type { warehouses, warehousesId } from './warehouses.ts';

export interface movementsAttributes {
  id: number;
  type: string;
  quantity: number;
  product_id: number;
  warehouse_origin_id?: number;
  warehouse_destiny_id?: number;
  created_at?: Date;
}

export type movementsPk = "id";
export type movementsId = movements[movementsPk];
export type movementsOptionalAttributes = "id" | "warehouse_origin_id" | "warehouse_destiny_id" | "created_at";
export type movementsCreationAttributes = Optional<movementsAttributes, movementsOptionalAttributes>;

export class movements extends Model<movementsAttributes, movementsCreationAttributes> implements movementsAttributes {
  declare id: number;
  declare type: string;
  declare quantity: number;
  declare product_id: number;
  declare warehouse_origin_id?: number;
  declare warehouse_destiny_id?: number;
  declare created_at?: Date;

  // movements belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;
  // movements belongsTo warehouses via warehouse_destiny_id
  warehouse_destiny!: warehouses;
  getWarehouse_destiny!: Sequelize.BelongsToGetAssociationMixin<warehouses>;
  setWarehouse_destiny!: Sequelize.BelongsToSetAssociationMixin<warehouses, warehousesId>;
  createWarehouse_destiny!: Sequelize.BelongsToCreateAssociationMixin<warehouses>;
  // movements belongsTo warehouses via warehouse_origin_id
  warehouse_origin!: warehouses;
  getWarehouse_origin!: Sequelize.BelongsToGetAssociationMixin<warehouses>;
  setWarehouse_origin!: Sequelize.BelongsToSetAssociationMixin<warehouses, warehousesId>;
  createWarehouse_origin!: Sequelize.BelongsToCreateAssociationMixin<warehouses>;

  static initModel(sequelize: Sequelize.Sequelize): typeof movements {
    return movements.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    warehouse_origin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    warehouse_destiny_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'movements',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "movements_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

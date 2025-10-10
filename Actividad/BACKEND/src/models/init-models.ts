import type { Sequelize } from "sequelize";
import { movements as _movements } from "./movements.ts";
import type { movementsAttributes, movementsCreationAttributes } from "./movements.ts";
import { products as _products } from "./products.ts";
import type { productsAttributes, productsCreationAttributes } from "./products.ts";
import { users as _users } from "./users.ts";
import type { usersAttributes, usersCreationAttributes } from "./users.ts";
import { warehouses as _warehouses } from "./warehouses.ts";
import type { warehousesAttributes, warehousesCreationAttributes } from "./warehouses.ts";

export {
  _movements as movements,
  _products as products,
  _users as users,
  _warehouses as warehouses,
};

export type {
  movementsAttributes,
  movementsCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  warehousesAttributes,
  warehousesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const movements = _movements.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const warehouses = _warehouses.initModel(sequelize);

  movements.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(movements, { as: "movements", foreignKey: "product_id"});
  movements.belongsTo(warehouses, { as: "warehouse_destiny", foreignKey: "warehouse_destiny_id"});
  warehouses.hasMany(movements, { as: "movements", foreignKey: "warehouse_destiny_id"});
  movements.belongsTo(warehouses, { as: "warehouse_origin", foreignKey: "warehouse_origin_id"});
  warehouses.hasMany(movements, { as: "warehouse_origin_movements", foreignKey: "warehouse_origin_id"});
  products.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouses.hasMany(products, { as: "products", foreignKey: "warehouse_id"});

  return {
    movements: movements,
    products: products,
    users: users,
    warehouses: warehouses,
  };
}

import type { Request, Response } from 'express';
import { models } from '../config/database.ts';
import { Op } from 'sequelize';
const { movements, products, warehouses } = models;

export const createMovement = async (req: Request, res: Response) => {
  const { type, quantity, product_id, warehouse_origin_id, warehouse_destiny_id } = req.body;

  try {
    const product = await products.findByPk(product_id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    if (type === 'salida' || type === 'traslado') {
      if (product.stock! < quantity) {
        return res.status(400).json({ message: 'Stock insuficiente para esta operación' });
      }
    }

    if (type === 'entrada') {
      await product.update({ stock: product.stock + quantity });
    } else if (type === 'salida') {
      await product.update({ stock: product.stock! - quantity });
    } else if (type === 'traslado') {
      await product.update({ stock: product.stock! - quantity });
    } else {
      return res.status(400).json({ message: 'Tipo de movimiento no válido' });
    }

    // Registrar movimiento
    const movement = await movements.create({
      type,
      quantity,
      product_id,
      warehouse_origin_id,
      warehouse_destiny_id,
    });

    res.status(201).json({ message: 'Movimiento registrado correctamente', movement });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar movimiento', error });
  }
};

export const getMovements = async (req: Request, res: Response) => {
  try {
    const { product_id, warehouse_id } = req.query;

    const where: any = {};
    if (product_id) where.product_id = product_id;
    if (warehouse_id) {
      where[Op.or] = [
        { warehouse_origin_id: warehouse_id },
        { warehouse_destiny_id: warehouse_id },
      ];
    }

    const allMovements = await movements.findAll({
      where,
      include: [
        { model: products, as: 'product' },
        { model: warehouses, as: 'warehouse_origin' },
        { model: warehouses, as: 'warehouse_destiny' },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json(allMovements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error });
  }
};

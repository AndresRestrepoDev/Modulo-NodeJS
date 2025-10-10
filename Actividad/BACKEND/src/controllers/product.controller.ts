import type { Request, Response } from 'express';
import { models } from '../config/database.ts'; 
const { products, warehouses } = models;

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, code, stock, warehouse_id } = req.body;

    const exists = await products.findOne({ where: { code } });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe un producto con ese código' });
    }

    const w = await warehouses.findByPk(warehouse_id);
    if (!w) {
      return res.status(400).send({ message: `El almacén con id ${warehouse_id} no existe` });
    }

    const product = await products.create({ name, code, stock, warehouse_id });
    res.status(201).json({ message: 'Producto creado correctamente', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const all = await products.findAll({ include: [{ model: warehouses, as: 'warehouse' }] });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await products.findByPk(req.params.id, {
      include: [{ model: warehouses, as: 'warehouse' }],
    });

    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, stock, warehouse_id } = req.body;
    const [updated] = await products.update(
      { name, stock, warehouse_id },
      { where: { id: req.params.id } }
    );

    if (updated === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await products.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};

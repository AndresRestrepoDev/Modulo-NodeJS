import type { Request, Response } from 'express';
import { models } from '../config/database.ts'; 
const { warehouses } = models;

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;

    const exists = await warehouses.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe una bodega con ese nombre' });
    }

    const warehouse = await warehouses.create({ name, location });
    res.status(201).json({ message: 'Bodega creada correctamente', warehouse });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la bodega', error });
  }
};

export const getWarehouses = async (_req: Request, res: Response) => {
  try {
    const list = await warehouses.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las bodegas', error });
  }
};

export const getWarehouseById = async (req: Request, res: Response) => {
  try {
    const warehouse = await warehouses.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Bodega no encontrada' });
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la bodega', error });
  }
};

export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    const [updated] = await warehouses.update({ name, location }, { where: { id: req.params.id } });

    if (updated === 0) return res.status(404).json({ message: 'Bodega no encontrada' });
    res.json({ message: 'Bodega actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la bodega', error });
  }
};

export const deleteWarehouse = async (req: Request, res: Response) => {
  try {
    const deleted = await warehouses.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Bodega no encontrada' });
    res.json({ message: 'Bodega eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la bodega', error });
  }
};

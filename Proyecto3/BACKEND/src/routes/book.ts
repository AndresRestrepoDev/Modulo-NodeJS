import { Router } from "express";
import { getB, getByIdB, addBook, deleteBook, updateBook } from "../controllers/book.controller.ts";

const router = Router();

router.get('/', getB);
router.get('/:id', getByIdB);
router.post('/', addBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export { router };
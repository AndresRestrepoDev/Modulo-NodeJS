import type { Request, Response } from "express";
import { getAllBooks, getAllByBooks, postBooks, deleteBooks, updateBooks } from "../services/book.service.ts";
import { error } from "console";

export const getB = async (req: Request, res: Response) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('[Server] Error getting books:', error)
        res.status(500).json({error: '[Server] Internal server error'})
    }
};

export const getByIdB = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(!id){
            return res.status(400).json({error: 'id requerid'});
        };
        const book = await getAllByBooks(id);
        if(!book){
            return res.status(404).json({ error: "Book not found" });
        };
        return res.status(200).json(book);
    } catch (error){
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addBook = async (req: Request, res: Response) => {
    try {
        const newBook = req.body;
        const createdBook = await postBooks(newBook);
        return res.status(201).json(createdBook);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteBook = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        if (!id){
            return res.status(400).json({ error: "Book ID is required" });
        }
        const deleted = await deleteBooks(Number(id));

        if (!deleted) {
            return res.status(404).json({ error: "Book not found" });
        }
        
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await updateBooks(Number(id), req.body);

        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
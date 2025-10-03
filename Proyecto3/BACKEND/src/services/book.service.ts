import { book, type IbookAdd } from '../models/book.model.ts'

export const getAllBooks = async (): Promise<book[]> => {
    return await book.findAll();
};

export const getAllByBooks = async (id: number): Promise<book | null> => {
    return await book.findByPk(id);
}

export const postBooks = async (newBook: IbookAdd ): Promise<book> => {
    return await book.create(newBook);
}

export const deleteBooks = async (id: number): Promise<boolean> => {
    const B = await book.findByPk(id);
    if(!B){
        return false;
    }
    await B.destroy();
    return true;
};

export const updateBooks = async (id: number, modifedBook: Partial<IbookAdd>): Promise<book | null>  =>{
    const B = await book.findByPk(id);
    if(!B){
        return null;
    }
    await B.update(modifedBook);
    return B;
}


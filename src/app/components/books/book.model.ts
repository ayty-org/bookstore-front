import { Category } from "./category.model";

export interface Book {
    uuid?: string,
    title: string,
    synopsis: string,
    isbn: string,
    publicationYear: Date,
    price: number,
    quantityInStock: number,
    authorName: string,
    categories: Category[]
}
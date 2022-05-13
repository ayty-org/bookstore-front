import { Book } from "../books/book.model";
import { Client } from "../clients/client.model";

export interface Purchase {
    uuid?: string,
    clientDTO: Client,
    bookDTOS: Book[],
    amount: number,
    purchaseDate: Date,
    isCompleted: boolean
}
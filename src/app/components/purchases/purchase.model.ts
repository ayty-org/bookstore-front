import { Book } from "../books/book.model";
import { Client } from "../clients/client.model";

export interface Purchase {
    uuid: string,
    client: Client,
    books: Book[],
    amout: number,
    purchaseDate: Date,
    isCompleted: boolean
}
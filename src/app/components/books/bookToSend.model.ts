
export interface BookToSend {
    uuid?: string,
    title: string,
    synopsis: string,
    isbn: string,
    publicationYear: Date,
    price: number,
    quantityInStock: number,
    authorName: string,
    categories: number[]
}
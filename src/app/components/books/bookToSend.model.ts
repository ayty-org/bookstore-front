
export interface BookToSend {
    uuid?: string,
    title: string,
    synopsis: string,
    isbn: string,
    publicationYear: Date | null,
    price: number | null,
    quantityInStock: number | null,
    authorName: string,
    categories: number[]
}
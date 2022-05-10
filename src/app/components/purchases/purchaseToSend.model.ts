
export interface PurchaseToSend {
    uuid?: string,
    clientUuid: string,
    booksUuid: string[],
    isCompleted: boolean
}
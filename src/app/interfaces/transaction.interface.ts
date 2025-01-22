export interface TransactionRequest {
    customerId: string;
    accountNumber: string;
    amount: number;
    transactionType: string;
}

export interface TransactionResponse {
    transactionId: string;
    accountId: string;
    transactionCost: string;
    amount: number;
    date: string;
    transactionType: string;
}
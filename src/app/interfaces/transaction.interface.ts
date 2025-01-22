export interface Transaction {
    customerId: string;
    accountNumber: string;
    amount: number;
    transactionType: string; // ej., BRANCH_DEPOSIT, PHYSICAL_PURCHASE
    createdAt?: string;
}
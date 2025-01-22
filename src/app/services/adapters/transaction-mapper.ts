import { TransactionRequest, TransactionResponse } from "../../interfaces/transaction.interface";

export class TransactionMapper {

    // Mapper para convertir de TransactionRequest a TransactionResponse
    static toTransactionResponse(transactionRequest: TransactionRequest, transactionId: string, transactionCost: string, accountId: string): TransactionResponse {
      const date = new Date().toISOString();  // Generamos la fecha actual en formato ISO
      
      return {
        transactionId: transactionId,              // Este es el ID de la transacción generado
        accountId: accountId,                       // El ID de la cuenta asociado a la transacción
        transactionCost: transactionCost,           // El costo de la transacción (puede ser calculado o fijo)
        amount: transactionRequest.amount,          // El monto de la transacción
        date: date,                                 // La fecha en que se realiza la transacción
        transactionType: transactionRequest.transactionType  // El tipo de transacción (ej. 'deposit', 'withdrawal')
      };
    }
  
    // Mapper para convertir de TransactionResponse a TransactionRequest (si fuera necesario)
    static toTransactionRequest(transactionResponse: TransactionResponse): TransactionRequest {
      return {
        customerId: '',                           // No está presente en TransactionResponse, se puede asignar vacío o tener lógica para obtenerlo
        accountNumber: '',                        // No está presente en TransactionResponse, se puede asignar vacío o tener lógica para obtenerlo
        amount: transactionResponse.amount,       // El monto de la transacción
        transactionType: transactionResponse.transactionType  // El tipo de transacción
      };
    }
  }
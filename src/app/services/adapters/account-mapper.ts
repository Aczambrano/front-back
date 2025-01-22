import { AccountRequest, AccountResponse } from "../../interfaces/Account.interface";


export class AccountMapper {
   // Mapper para convertir de AccountRequest a AccountResponse
   static toAccountResponse(accountRequest: AccountRequest, accountId: string): AccountResponse {
    return {
      customerId: accountRequest.customerId || '',  // Asignamos un valor por defecto si es undefined
      accountId: accountId,                         // Aquí asumimos que se genera el accountId de algún modo
      owner: accountRequest.owner,
      accountNumber: accountRequest.accountNumber,
      balance: accountRequest.initialBalance        // La propiedad 'balance' en la respuesta es igual a 'initialBalance' en la solicitud
    };
  }

  // Mapper para convertir de AccountResponse a AccountRequest (si fuera necesario)
  static toAccountRequest(accountResponse: AccountResponse): AccountRequest {
    return {
      customerId: accountResponse.customerId,       // Usamos el valor de customerId de la respuesta
      accountNumber: accountResponse.accountNumber, // Usamos el valor de accountNumber de la respuesta
      initialBalance: accountResponse.balance,      // El balance de la respuesta se mapea al initialBalance
      owner: accountResponse.owner                  // El owner de la respuesta
    };
  }
}
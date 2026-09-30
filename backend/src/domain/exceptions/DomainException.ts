export class DomainException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = "DomainException";
    this.statusCode = statusCode;
  }
}

export class InsufficientFundsException extends DomainException {
  constructor(accountNumber: string, currentBalance: number, requiredAmount: number) {
    super(
      `Fondos insuficientes en la cuenta ${accountNumber}. Saldo actual: $${currentBalance.toFixed(
        2
      )}, Monto requerido: $${requiredAmount.toFixed(2)}.`,
      422
    );
    this.name = "InsufficientFundsException";
  }
}

export class AccountNotFoundException extends DomainException {
  constructor(accountId: string) {
    super(`La cuenta bancaria con ID ${accountId} no existe.`, 404);
    this.name = "AccountNotFoundException";
  }
}

export class BudgetExceededException extends DomainException {
  constructor(category: string, budgetLimit: number, currentSpent: number) {
    super(
      `Alerta de Presupuesto: El gasto actual ($${currentSpent.toFixed(
        2
      )}) ha superado el límite asignado a la categoría '${category}' ($${budgetLimit.toFixed(2)}).`,
      400
    );
    this.name = "BudgetExceededException";
  }
}
import { Transaction } from "../../domain/entities/Transaction";
import {
  AccountNotFoundException,
  BudgetExceededException,
} from "../../domain/exceptions/DomainException";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { CreateTransactionInput, TransactionOutput } from "../dtos/FinancialDTOs";

export class ProcessTransactionUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository
  ) {}

  async execute(input: CreateTransactionInput): Promise<TransactionOutput> {
    const sourceAccount = await this.accountRepo.findById(input.accountId);
    if (!sourceAccount) {
      throw new AccountNotFoundException(input.accountId);
    }

    // Regla de Negocio: Validar alerta de presupuesto superado en egresos
    if (input.type === "EXPENSE") {
      const budgetLimit = sourceAccount.getBudgetLimit(input.category);
      if (budgetLimit !== null) {
        const currentSpent = await this.transactionRepo.getCategoryTotalSpent(
          input.accountId,
          input.category
        );
        if (currentSpent + input.amount > budgetLimit) {
          throw new BudgetExceededException(
            input.category,
            budgetLimit,
            currentSpent + input.amount
          );
        }
      }
      sourceAccount.withdraw(input.amount);
    } else if (input.type === "INCOME") {
      sourceAccount.deposit(input.amount);
    } else if (input.type === "TRANSFER") {
      if (!input.targetAccountId) {
        throw new Error("Debe especificar la cuenta destino para realizar una transferencia.");
      }
      const targetAccount = await this.accountRepo.findById(input.targetAccountId);
      if (!targetAccount) {
        throw new AccountNotFoundException(input.targetAccountId);
      }

      sourceAccount.withdraw(input.amount);
      targetAccount.deposit(input.amount);
      await this.accountRepo.save(targetAccount);
    }

    // Guardar cambios en la cuenta origen
    await this.accountRepo.save(sourceAccount);

    // Crear y guardar entidad Transacción
    const transaction = new Transaction({
      id: `tx-${Date.now()}`,
      accountId: input.accountId,
      targetAccountId: input.targetAccountId,
      type: input.type,
      category: input.category,
      amount: input.amount,
      description: input.description,
      date: new Date(),
    });

    await this.transactionRepo.save(transaction);

    return {
      id: transaction.id,
      accountId: transaction.accountId,
      targetAccountId: transaction.targetAccountId,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.toISOString(),
    };
  }
}
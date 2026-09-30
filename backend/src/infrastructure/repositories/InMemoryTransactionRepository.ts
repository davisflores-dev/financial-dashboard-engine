import { Transaction } from "../../domain/entities/Transaction";
import {
  ITransactionRepository,
  TransactionFilter,
} from "../../domain/repositories/ITransactionRepository";
import { initialTransactions } from "../database/mockFinancialData";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [...initialTransactions];

  async save(transaction: Transaction): Promise<void> {
    this.transactions.unshift(transaction); // Agrega al inicio para orden cronológico inverso
  }

  async findAll(filter?: TransactionFilter): Promise<Transaction[]> {
    let result = [...this.transactions];

    if (filter?.accountId) {
      result = result.filter(
        (t) => t.accountId === filter.accountId || t.targetAccountId === filter.accountId
      );
    }

    if (filter?.category) {
      result = result.filter(
        (t) => t.category.toLowerCase() === filter.category?.toLowerCase()
      );
    }

    if (filter?.type) {
      result = result.filter((t) => t.type === filter.type);
    }

    if (filter?.startDate) {
      result = result.filter((t) => t.date >= filter.startDate!);
    }

    if (filter?.endDate) {
      result = result.filter((t) => t.date <= filter.endDate!);
    }

    return result;
  }

  async getCategoryTotalSpent(accountId: string, category: string): Promise<number> {
    return this.transactions
      .filter(
        (t) =>
          t.accountId === accountId &&
          t.category.toLowerCase() === category.toLowerCase() &&
          t.type === "EXPENSE"
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }
}
import { Transaction, TransactionType } from "../entities/Transaction";

export interface TransactionFilter {
  accountId?: string;
  category?: string;
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
}

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findAll(filter?: TransactionFilter): Promise<Transaction[]>;
  getCategoryTotalSpent(accountId: string, category: string): Promise<number>;
}
import { TransactionType } from "../../domain/entities/Transaction";

export interface CreateTransactionInput {
  accountId: string;
  targetAccountId?: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
}

export interface TransactionOutput {
  id: string;
  accountId: string;
  targetAccountId?: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface DashboardMetricsOutput {
  consolidatedBalance: number;
  totalIncome: number;
  totalExpense: number;
  transactionsCount: number;
  accounts: {
    id: string;
    accountNumber: string;
    holderName: string;
    balance: number;
  }[];
}
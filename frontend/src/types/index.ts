export interface Account {
  id: string;
  accountNumber: string;
  holderName: string;
  balance: number;
}

export interface DashboardMetrics {
  consolidatedBalance: number;
  totalIncome: number;
  totalExpense: number;
  transactionsCount: number;
  accounts: Account[];
}

export interface Transaction {
  id: string;
  accountId: string;
  targetAccountId?: string;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  category: string;
  amount: number;
  description: string;
  date: string;
}
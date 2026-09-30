import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { DashboardMetricsOutput } from "../dtos/FinancialDTOs";

export class GetDashboardMetricsUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository
  ) {}

  async execute(): Promise<DashboardMetricsOutput> {
    const accounts = await this.accountRepo.findAll();
    const transactions = await this.transactionRepo.findAll();

    const consolidatedBalance = accounts.reduce((acc, a) => acc + a.balance, 0);

    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      consolidatedBalance,
      totalIncome,
      totalExpense,
      transactionsCount: transactions.length,
      accounts: accounts.map((a) => ({
        id: a.id,
        accountNumber: a.accountNumber,
        holderName: a.holderName,
        balance: a.balance,
      })),
    };
  }
}
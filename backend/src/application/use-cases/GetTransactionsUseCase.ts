import { TransactionType } from "../../domain/entities/Transaction";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { TransactionOutput } from "../dtos/FinancialDTOs";

export class GetTransactionsUseCase {
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(filter?: {
    accountId?: string;
    category?: string;
    type?: TransactionType;
  }): Promise<TransactionOutput[]> {
    const transactions = await this.transactionRepo.findAll(filter);
    return transactions.map((t) => ({
      id: t.id,
      accountId: t.accountId,
      targetAccountId: t.targetAccountId,
      type: t.type,
      category: t.category,
      amount: t.amount,
      description: t.description,
      date: t.date.toISOString(),
    }));
  }
}
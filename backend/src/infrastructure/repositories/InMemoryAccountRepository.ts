import { Account } from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { initialAccounts } from "../database/mockFinancialData";

export class InMemoryAccountRepository implements IAccountRepository {
  private accounts: Account[] = [...initialAccounts];

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((a) => a.id === id);
    return account || null;
  }

  async findAll(): Promise<Account[]> {
    return this.accounts;
  }

  async save(account: Account): Promise<void> {
    const index = this.accounts.findIndex((a) => a.id === account.id);
    if (index >= 0) {
      this.accounts[index] = account;
    } else {
      this.accounts.push(account);
    }
  }
}
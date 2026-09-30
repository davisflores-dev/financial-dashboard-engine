import { InsufficientFundsException } from "../exceptions/DomainException";

export interface AccountProps {
  id: string;
  accountNumber: string;
  holderName: string;
  balance: number;
  categoryBudgets?: Record<string, number>; // Ej. { "Alimentación": 500, "Tecnología": 1000 }
}

export class Account {
  private props: AccountProps;

  constructor(props: AccountProps) {
    if (props.balance < 0) {
      throw new Error("El saldo inicial no puede ser negativo.");
    }
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get accountNumber(): string { return this.props.accountNumber; }
  get holderName(): string { return this.props.holderName; }
  get balance(): number { return this.props.balance; }

  // Depositar Fondos (Ingreso)
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("El monto a depositar debe ser mayor a 0.");
    this.props.balance += amount;
  }

  // Retirar Fondos (Egreso / Transferencia de salida)
  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("El monto a retirar debe ser mayor a 0.");
    if (this.props.balance < amount) {
      throw new InsufficientFundsException(this.props.accountNumber, this.props.balance, amount);
    }
    this.props.balance -= amount;
  }

  // Límite de presupuesto por categoría
  getBudgetLimit(category: string): number | null {
    if (!this.props.categoryBudgets) return null;
    return this.props.categoryBudgets[category] ?? null;
  }
}
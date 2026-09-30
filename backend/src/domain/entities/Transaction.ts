export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface TransactionProps {
  id: string;
  accountId: string;
  targetAccountId?: string; // Solo para transferencias
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export class Transaction {
  private props: TransactionProps;

  constructor(props: TransactionProps) {
    if (props.amount <= 0) {
      throw new Error("El monto de la transacción debe ser mayor a cero.");
    }
    this.props = props;
  }

  get id(): string { return this.props.id; }
  get accountId(): string { return this.props.accountId; }
  get targetAccountId(): string | undefined { return this.props.targetAccountId; }
  get type(): TransactionType { return this.props.type; }
  get category(): string { return this.props.category; }
  get amount(): number { return this.props.amount; }
  get description(): string { return this.props.description; }
  get date(): Date { return this.props.date; }
}
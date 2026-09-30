import { Account } from "../../domain/entities/Account";
import { Transaction } from "../../domain/entities/Transaction";

export const initialAccounts: Account[] = [
  new Account({
    id: "acc-1",
    accountNumber: "CTA-1001-B2B",
    holderName: "Empresa Operaciones S.A.",
    balance: 15000.0,
    categoryBudgets: {
      Tecnología: 2000.0,
      Marketing: 1500.0,
      Alimentación: 500.0,
    },
  }),
  new Account({
    id: "acc-2",
    accountNumber: "CTA-2002-RES",
    holderName: "Fondo de Reserva Operativo",
    balance: 8500.0,
    categoryBudgets: {},
  }),
];

export const initialTransactions: Transaction[] = [
  new Transaction({
    id: "tx-101",
    accountId: "acc-1",
    type: "INCOME",
    category: "Ventas",
    amount: 5000.0,
    description: "Cobro de factura cliente Corp A",
    date: new Date("2026-09-01T10:00:00Z"),
  }),
  new Transaction({
    id: "tx-102",
    accountId: "acc-1",
    type: "EXPENSE",
    category: "Tecnología",
    amount: 800.0,
    description: "Suscripción a servicios Cloud",
    date: new Date("2026-09-10T14:30:00Z"),
  }),
];
"use client";

import { useState } from "react";
import { Account } from "@/types";

interface Props {
  accounts: Account[];
  onTransactionSuccess: () => void;
}

export default function TransactionForm({ accounts, onTransactionSuccess }: Props) {
  const [type, setType] = useState<"INCOME" | "EXPENSE" | "TRANSFER">("EXPENSE");
  const [accountId, setAccountId] = useState(accounts[0]?.id || "");
  const [targetAccountId, setTargetAccountId] = useState(accounts[1]?.id || "");
  const [category, setCategory] = useState("Tecnología");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload: any = {
      accountId,
      type,
      category,
      amount: parseFloat(amount),
      description,
    };

    if (type === "TRANSFER") {
      payload.targetAccountId = targetAccountId;
    }

    try {
      const res = await fetch("http://localhost:4000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar la transacción.");
      }

      setSuccessMessage(`✅ Transacción procesada correctamente (ID: ${data.id})`);
      setAmount("");
      setDescription("");
      onTransactionSuccess();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Registrar Movimiento Financiero</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Operación</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full border rounded-lg p-2.5 text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="EXPENSE">Egreso / Gasto</option>
            <option value="INCOME">Ingreso</option>
            <option value="TRANSFER">Transferencia entre Cuentas</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cuenta Origen</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.holderName} (${acc.balance.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {type === "TRANSFER" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cuenta Destino</label>
              <select
                value={targetAccountId}
                onChange={(e) => setTargetAccountId(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {accounts
                  .filter((a) => a.id !== accountId)
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.holderName} (${acc.balance.toFixed(2)})
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
            <input
              type="text"
              placeholder="Ej. Tecnología, Ventas, Marketing"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Monto ($USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
          <input
            type="text"
            placeholder="Ej. Pago de servidor cloud mensual"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:bg-slate-400"
        >
          {loading ? "Procesando en Dominio..." : "Ejecutar Transacción"}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm rounded-r">
          <p className="font-bold">⚠️ Regla de Dominio Rechazada</p>
          <p className="mt-1">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r">
          <p className="font-medium">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
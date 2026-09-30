import { Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Historial de Transacciones</h3>

      {transactions.length === 0 ? (
        <p className="text-sm text-slate-500">No hay movimientos registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
              <tr>
                <th className="p-3">Tipo</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Descripción</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                        tx.type === "INCOME"
                          ? "bg-emerald-100 text-emerald-800"
                          : tx.type === "EXPENSE"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{tx.category}</td>
                  <td className="p-3">{tx.description}</td>
                  <td
                    className={`p-3 font-semibold ${
                      tx.type === "INCOME"
                        ? "text-emerald-600"
                        : tx.type === "EXPENSE"
                        ? "text-rose-600"
                        : "text-blue-600"
                    }`}
                  >
                    {tx.type === "INCOME" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </td>
                  <td className="p-3 text-xs text-slate-400">
                    {new Date(tx.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
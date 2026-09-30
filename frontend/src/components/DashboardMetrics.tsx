import { DashboardMetrics } from "@/types";

interface Props {
  metrics: DashboardMetrics;
}

export default function DashboardMetricsCards({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Saldo Consolidado */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500">Saldo Consolidado Total</p>
        <p className="text-3xl font-extrabold text-slate-900 mt-2">
          ${metrics.consolidatedBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Cuentas vinculadas: {metrics.accounts.length}
        </p>
      </div>

      {/* Total Ingresos */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500">Ingresos Totales</p>
        <p className="text-3xl font-extrabold text-emerald-600 mt-2">
          +${metrics.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-slate-500 mt-2">Flujo positivo registrado</p>
      </div>

      {/* Total Egresos */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500">Egresos Totales</p>
        <p className="text-3xl font-extrabold text-rose-600 mt-2">
          -${metrics.totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-slate-500 mt-2">Gastos acumulados</p>
      </div>
    </div>
  );
}
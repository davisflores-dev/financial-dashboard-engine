"use client";

import { useEffect, useState } from "react";
import DashboardMetricsCards from "@/components/DashboardMetrics";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { DashboardMetrics, Transaction } from "@/types";

export default function FinancialDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [resMetrics, resTx] = await Promise.all([
        fetch("http://localhost:4000/api/metrics", { cache: "no-store" }),
        fetch("http://localhost:4000/api/transactions", { cache: "no-store" }),
      ]);

      if (resMetrics.ok && resTx.ok) {
        setMetrics(await resMetrics.json());
        setTransactions(await resTx.json());
      }
    } catch (error) {
      console.error("Error al cargar datos financieros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600 font-medium">
        Cargando Dashboard Financiero...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Engine de Procesamiento Financiero & Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Demostración de Clean Architecture, manejo de eventos financieros y Custom Domain Exceptions en Express + Next.js.
          </p>
        </header>

        {/* Tarjetas de Métricas */}
        <DashboardMetricsCards metrics={metrics} />

        {/* Formulario e Historial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TransactionForm accounts={metrics.accounts} onTransactionSuccess={fetchData} />
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </main>
  );
}
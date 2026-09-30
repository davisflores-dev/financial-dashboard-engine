import { Router } from "express";
import { InMemoryAccountRepository } from "../../infrastructure/repositories/InMemoryAccountRepository.js";
import { InMemoryTransactionRepository } from "../../infrastructure/repositories/InMemoryTransactionRepository.js";
import { ProcessTransactionUseCase } from "../../application/use-cases/ProcessTransactionUseCase.js";
import { GetDashboardMetricsUseCase } from "../../application/use-cases/GetDashboardMetricsUseCase.js";
import { GetTransactionsUseCase } from "../../application/use-cases/GetTransactionsUseCase.js";
import { FinancialController } from "../controllers/FinancialController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createTransactionSchema } from "../middlewares/transactionSchema.js";

const router = Router();

// 1. Instanciar Repositorios
const accountRepo = new InMemoryAccountRepository();
const transactionRepo = new InMemoryTransactionRepository();

// 2. Instanciar Casos de Uso
const processTransactionUseCase = new ProcessTransactionUseCase(accountRepo, transactionRepo);
const getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(accountRepo, transactionRepo);
const getTransactionsUseCase = new GetTransactionsUseCase(transactionRepo);

// 3. Instanciar Controlador
const financialController = new FinancialController(
  processTransactionUseCase,
  getDashboardMetricsUseCase,
  getTransactionsUseCase
);

// 4. Endpoints
router.get("/metrics", (req, res, next) => financialController.getMetrics(req, res, next));
router.get("/transactions", (req, res, next) => financialController.getTransactions(req, res, next));
router.post(
  "/transactions",
  validateRequest(createTransactionSchema),
  (req, res, next) => financialController.processTransaction(req, res, next)
);

export default router;
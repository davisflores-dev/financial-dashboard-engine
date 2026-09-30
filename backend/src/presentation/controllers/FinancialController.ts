import { Request, Response, NextFunction } from "express";
import { ProcessTransactionUseCase } from "../../application/use-cases/ProcessTransactionUseCase";
import { GetDashboardMetricsUseCase } from "../../application/use-cases/GetDashboardMetricsUseCase";
import { GetTransactionsUseCase } from "../../application/use-cases/GetTransactionsUseCase";

export class FinancialController {
  constructor(
    private processTransactionUseCase: ProcessTransactionUseCase,
    private getDashboardMetricsUseCase: GetDashboardMetricsUseCase,
    private getTransactionsUseCase: GetTransactionsUseCase
  ) {}

  async getMetrics(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const metrics = await this.getDashboardMetricsUseCase.execute();
      res.status(200).json(metrics);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accountId, category, type } = req.query;
      const transactions = await this.getTransactionsUseCase.execute({
        accountId: accountId as string,
        category: category as string,
        type: type as any,
      });
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async processTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.processTransactionUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
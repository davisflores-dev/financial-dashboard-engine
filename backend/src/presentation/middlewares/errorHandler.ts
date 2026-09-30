import { Request, Response, NextFunction } from "express";
import { DomainException } from "../../domain/exceptions/DomainException";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof DomainException) {
    res.status(err.statusCode).json({
      errorType: err.name,
      message: err.message,
    });
    return;
  }

  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    errorType: "InternalServerError",
    message: "Ocurrió un error inesperado en el servidor.",
  });
};
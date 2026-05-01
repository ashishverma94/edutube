import type { Request, Response, NextFunction, RequestHandler } from "express";

// ─── Typed app error ──────────────────────────────────────────────────────────

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

// ─── Wrap async route handlers to catch rejections ───────────────────────────

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

// ─── Global error handler (register last in Express) ─────────────────────────

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ ok: false, error: err.message });
    return;
  }

  const message =
    err instanceof Error ? err.message : "Internal server error";

  console.error("[ErrorHandler]", err);
  res.status(500).json({ ok: false, error: message });
}
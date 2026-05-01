import type { Request, Response, NextFunction } from "express";

// ─── ANSI color helpers ───────────────────────────────────────────────────────

const c = {
  reset:   "\x1b[0m",
  dim:     "\x1b[2m",
  bold:    "\x1b[1m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  red:     "\x1b[31m",
  cyan:    "\x1b[36m",
  magenta: "\x1b[35m",
  white:   "\x1b[37m",
  gray:    "\x1b[90m",
};

function methodColor(method: string): string {
  switch (method) {
    case "GET":    return c.green;
    case "POST":   return c.cyan;
    case "PUT":    return c.yellow;
    case "PATCH":  return c.magenta;
    case "DELETE": return c.red;
    default:       return c.white;
  }
}

function statusColor(status: number): string {
  if (status >= 500) return c.red;
  if (status >= 400) return c.yellow;
  if (status >= 300) return c.cyan;
  return c.green;
}

function pad(str: string, len: number): string {
  return str.padEnd(len, " ");
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const time = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm

  res.on("finish", () => {
    const ms      = Date.now() - start;
    const method  = pad(req.method, 7);
    const status  = res.statusCode;
    const route   = req.originalUrl;
    const dur     = `${ms}ms`;

    const mCol = methodColor(req.method);
    const sCol = statusColor(status);

    process.stdout.write(
      `${c.gray}${time}${c.reset}  ` +
      `${c.bold}${mCol}${method}${c.reset}  ` +
      `${sCol}${status}${c.reset}  ` +
      `${c.white}${pad(route, 40)}${c.reset}  ` +
      `${c.dim}${dur}${c.reset}\n`
    );
  });

  next();
}

// ─── Startup banner ───────────────────────────────────────────────────────────

export function printBanner(port: number, env: string): void {
  const line = "─".repeat(50);
  console.log(`\n${c.green}${c.bold}  EduTube API${c.reset}`);
  console.log(`${c.gray}  ${line}${c.reset}`);
  console.log(`${c.gray}  env   ${c.reset}${env}`);
  console.log(`${c.gray}  url   ${c.reset}${c.cyan}http://localhost:${port}${c.reset}`);
  console.log(`${c.gray}  ${line}${c.reset}\n`);
  console.log(`${c.gray}  time         method   status  route${c.reset}`);
  console.log(`${c.gray}  ${"─".repeat(48)}${c.reset}\n`);
}
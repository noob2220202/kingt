import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "crypto";

const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN);
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

interface SessionPayload {
  adminId: string;
  email: string;
  exp: number;
}

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-change-me";
}

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

export function createSessionToken(adminId: string, email: string): {
  token: string;
  maxAge: number;
} {
  const payload: SessionPayload = {
    adminId,
    email,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const body = base64url(Buffer.from(JSON.stringify(payload)));
  const signature = base64url(
    createHmac("sha256", getSessionSecret()).update(body).digest()
  );
  return { token: `${body}.${signature}`, maxAge: SESSION_MAX_AGE_SECONDS };
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSignature = base64url(
    createHmac("sha256", getSessionSecret()).update(body).digest()
  );
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64urlDecode(body).toString()) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_COOKIE = "admin_session";

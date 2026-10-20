import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

type AdminSessionPayload = {
  username: string;
  role: "admin";
  exp: number;
};

const sessionCookieName = "GCSC_admin_session";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET 환경 변수가 설정되지 않았습니다.");
  return secret;
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createAdminSessionToken(username: string, maxAgeSeconds = 60 * 60 * 8) {
  const payload: AdminSessionPayload = {
    username,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) {
    return null;
  }

  const expected = sign(encoded);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  const payload = JSON.parse(fromBase64Url(encoded)) as AdminSessionPayload;

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000) || payload.role !== "admin") {
    return null;
  }

  return payload;
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_LOGIN_ID;
  const password = process.env.ADMIN_LOGIN_PASSWORD;
  if (!username || !password) {
    throw new Error("ADMIN_LOGIN_ID / ADMIN_LOGIN_PASSWORD 환경 변수가 설정되지 않았습니다.");
  }
  return { username, password };
}

// 길이 정보 유출 방지를 위해 SHA-256 해시로 길이를 맞춘 뒤 비교
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function isValidAdminLogin(username: string, password: string) {
  const credentials = getAdminCredentials();
  const userOk = safeEqual(username, credentials.username);
  const passOk = safeEqual(password, credentials.password);
  return userOk && passOk;
}

export function getSessionCookieName() {
  return sessionCookieName;
}

function readTokenFromCookieHeader(cookieHeader?: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const cookiesMap = cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rawValue] = part.trim().split("=");

    if (!rawKey) {
      return acc;
    }

    acc[rawKey] = rawValue.join("=");
    return acc;
  }, {});

  return cookiesMap[sessionCookieName] || null;
}

export function getCurrentAdminSession(cookieHeader?: string | null) {
  const token = cookieHeader ? readTokenFromCookieHeader(cookieHeader) : cookies().get(sessionCookieName)?.value;
  return verifyAdminSessionToken(token);
}

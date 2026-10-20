import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const sessionCookieName = "GCSC_admin_session";

function isProtectedAdminPage(pathname: string) {
  return pathname.startsWith("/admin") && pathname !== "/admin/login";
}

function isProtectedAdminApi(pathname: string) {
  return pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";
}

// Edge 런타임에서는 node:crypto를 쓸 수 없으므로 Web Crypto로 HMAC 서명·만료를 검증한다.
function base64UrlToBytes(value: string) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function isValidSessionToken(token: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      new TextEncoder().encode(encoded),
    );
    if (!ok) return false;

    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encoded)));
    return payload?.role === "admin" && typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedAdminPage(pathname) && !isProtectedAdminApi(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(sessionCookieName)?.value;

  if (token && (await isValidSessionToken(token))) {
    return NextResponse.next();
  }

  if (isProtectedAdminApi(pathname)) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

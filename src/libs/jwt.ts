import { SignJWT, jwtVerify } from "jose";

export async function sign<T extends Record<string, unknown>>(
  payload: T
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.SECRET_KEY ?? "fiems"));
}

export async function verify<T extends Record<string, unknown>>(
  token: string
): Promise<T | null> {
  try {
    const { payload } = await jwtVerify<T>(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY ?? "fiems")
    );

    return payload;
  } catch (_) {
    return null;
  }
}

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyUserToken() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) {
    console.log(" No session token found");
    return null;
  }

  const decodedToken = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET || "",
  });

  console.log(" decodedToken", decodedToken);

  return decodedToken?.credentialsToken;
}

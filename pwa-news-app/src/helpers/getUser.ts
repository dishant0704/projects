'use server'
import { jwtVerify } from "jose"; // Use 'jose' for Edge compatibility
import { cookies } from "next/headers";

const getJwtSecretKey = () => {
  const secret = process.env.TOKEN_SECRET!;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
};

export async function verifyAndReadToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    // Payload contains the claims (e.g., userId, username)
    return payload; 
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // or handle expiration/invalidity as needed
  }
}

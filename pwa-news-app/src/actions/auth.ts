import { signIn, SignInOptions, signOut } from "next-auth/react"

export async function oauthSignIn(provider: string | undefined, object: SignInOptions<true> | undefined) {
  await signIn(provider, object)
}
export async function oauthSignOut(){
  await signOut()
}
